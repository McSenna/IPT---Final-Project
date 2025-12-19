import { useEffect, useState } from 'react'
import { useLocalStorage } from '../../shared/hooks/useLocalStorage'
import { CHAT_STORAGE_KEY } from '../../shared/config/constants'

const createInitialMessages = () => []

export function useChat() {
  // `defaultValue` here is only used when there is no value in localStorage.
  // It is stable across renders because `useLocalStorage` no longer depends
  // on the identity of this object, only on the key.
  const [stored, setStored] = useLocalStorage(CHAT_STORAGE_KEY, {
    messages: [],
  })

  // Initialise messages from storage once; if nothing is stored, start with empty array
  const [messages, setMessages] = useState(
    () => (stored && Array.isArray(stored.messages) && stored.messages.length > 0
      ? stored.messages
      : createInitialMessages()),
  )
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState('')

  // Persist messages to localStorage when they change.
  // This effect does NOT change `messages`, so it cannot cause an infinite loop.
  useEffect(() => {
    setStored((prev) => {
      const prevMessages = prev && Array.isArray(prev.messages) ? prev.messages : []

      // If the reference is the same, avoid writing and returning a new object.
      if (prevMessages === messages) return prev || { messages }

      return { ...(prev || {}), messages }
    })
  }, [messages, setStored])

  const appendMessage = (message) => {
    setMessages((prev) => [...prev, { ...message, id: crypto.randomUUID(), createdAt: Date.now() }])
  }

  const sendMessage = (model = 'chain') => {
    const trimmed = input.trim()
    if (!trimmed || isStreaming) return

    setError('')

    const userMessage = { role: 'user', content: trimmed }

    // Optimistically append the user message to the UI.
    appendMessage(userMessage)
    setInput('')

    // Build the full conversation payload (roles + content only) for the backend.
    const payloadMessages = [
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      userMessage,
    ]

    const controller = new AbortController()

    const send = async () => {
      setIsStreaming(true)

      try {
        const headers = {
          'Content-Type': 'application/json',
        }

        // Optionally forward a local API token if configured in the frontend env.
        const token = import.meta.env.VITE_LOCAL_API_TOKEN
        if (token) {
          // Backend expects this exact header when LOCAL_API_TOKEN is set.
          headers['X-LOCAL-TOKEN'] = token
        }

        const response = await fetch('http://localhost:3000/api/chat', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            model,
            messages: payloadMessages,
            stream: true,
          }),
          signal: controller.signal,
        })

        if (!response.ok || !response.body) {
          throw new Error(`Backend error: ${response.status}`)
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder('utf-8')
        let buffer = ''
        let fullContent = ''

        // Consume server‑sent event style streaming: "data: {json}\n\n"
        // We accumulate all content and add a single assistant message when complete.
        // This keeps the UI simple while still using the streaming backend.
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { value, done } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const parts = buffer.split('\n\n')
          buffer = parts.pop() || ''

          for (const part of parts) {
            const line = part.trim()
            if (!line.startsWith('data:')) continue

            const jsonStr = line.slice(5).trim()
            if (!jsonStr || jsonStr === '[DONE]') continue

            let chunk
            try {
              chunk = JSON.parse(jsonStr)
            } catch {
              // Ignore malformed chunks instead of breaking the entire response.
              // This makes the UI more robust to transient streaming glitches.
              // eslint-disable-next-line no-continue
              continue
            }

            const delta = chunk?.message?.content || ''
            if (delta) {
              fullContent += delta
            }
          }
        }

        if (!fullContent) {
          throw new Error('Empty response from model')
        }

        appendMessage({
          role: 'assistant',
          content: fullContent,
        })
      } catch (err) {
        console.error('Chat error:', err)
        setError('Failed to reach the AI backend. Check that the backend and Ollama are running, then try again.')
      } finally {
        setIsStreaming(false)
      }
    }

    // Fire and forget; errors are handled inside `send`.
    void send()
  }

  const resetConversation = () => {
    const initial = createInitialMessages()
    setMessages(initial)
    setStored({ messages: initial })
    setInput('')
    setError('')
  }

  const loadConversation = (conversationMessages) => {
    if (!Array.isArray(conversationMessages) || !conversationMessages.length) return

    setMessages(conversationMessages)
    setStored({ messages: conversationMessages })
    setInput('')
    setError('')
  }

  return {
    messages,
    input,
    isStreaming,
    error,
    sendMessage,
    setInput,
    resetConversation,
    loadConversation,
  }
}

