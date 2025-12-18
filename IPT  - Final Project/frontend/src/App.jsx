import { useEffect, useRef, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:3000/api/chat'
const MODEL_NAME = 'chain'

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hello, I am your local blockchain-focused AI running fully on your machine. How can I help you today?',
    },
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages.length])

  async function handleSend(e) {
    e.preventDefault()
    setError('')
    const text = input.trim()
    if (!text || isStreaming) return

    const newMessages = [
      ...messages,
      { role: 'user', content: text },
      { role: 'assistant', content: '' },
    ]
    setMessages(newMessages)
    setInput('')
    setIsStreaming(true)

    try {
      await streamChat(newMessages)
    } catch (err) {
      setError('Unable to connect to the local AI backend. Please check that it is running.')
      console.error(err)
      setIsStreaming(false)
    }
  }

  async function streamChat(history) {
    const controller = new AbortController()
    const body = JSON.stringify({
      model: MODEL_NAME,
      messages: history.map((m) => ({ role: m.role, content: m.content })),
      stream: true,
    })

    // Optional local token support for LAN security (matches backend README)
    const headers = {
      'Content-Type': 'application/json',
    }
    const token = import.meta.env.VITE_LOCAL_API_TOKEN
    if (token) {
      headers['X-LOCAL-TOKEN'] = token
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body,
      signal: controller.signal,
    })

    if (!response.ok || !response.body) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      const parts = buffer.split('\n\n')
      buffer = parts.pop() || ''

      for (const part of parts) {
        if (!part.startsWith('data:')) continue
        const jsonStr = part.replace(/^data:\s*/, '').trim()
        if (!jsonStr) continue

        try {
          const data = JSON.parse(jsonStr)
          if (data.done) {
            setIsStreaming(false)
            return
          }
          const token = data.message?.content ?? ''
          if (!token) continue

          setMessages((prev) => {
            const updated = [...prev]
            const lastIndex = updated.length - 1
            if (lastIndex >= 0 && updated[lastIndex].role === 'assistant') {
              updated[lastIndex] = {
                ...updated[lastIndex],
                content: updated[lastIndex].content + token,
              }
            }
            return updated
          })
        } catch (e) {
          console.error('Failed to parse stream chunk', e)
        }
      }
    }

    setIsStreaming(false)
  }

  return (
    <div className="app-root">
      <main className="chat-shell">
        <header className="chat-header">
          <div className="chat-title">Local AI Chat</div>
          <div className="chat-subtitle">Runs 100% on your machine using Ollama &quot;chain&quot;</div>
        </header>

        <section className="chat-window">
          <div className="messages-scroll">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`message-row ${m.role === 'user' ? 'message-user' : 'message-assistant'}`}
              >
                <div className="message-bubble">
                  {m.content || (m.role === 'assistant' && isStreaming ? <span className="cursor" /> : '')}
                </div>
              </div>
            ))}
            {isStreaming && (
              <div className="stream-indicator">
                <span className="dot" />
                <span>Thinking…</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </section>

        {error && <div className="error-banner">{error}</div>}

        <form className="input-bar" onSubmit={handleSend}>
          <textarea
            className="input-field"
            placeholder="Ask about blockchain concepts…"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isStreaming}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend(e)
              }
            }}
          />
          <button className="send-btn" type="submit" disabled={isStreaming || !input.trim()}>
            {isStreaming ? 'Streaming…' : 'Send'}
          </button>
        </form>

        <footer className="app-footer">
          <span>Local AI Chat • Powered by Ollama &quot;chain&quot; • Runs 100% Offline</span>
        </footer>
      </main>
    </div>
  )
}

export default App
