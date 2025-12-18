import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:3000/api/chat'
const MODEL_NAME = 'chain'

function createInitialChat() {
  return {
    id: crypto.randomUUID(),
    title: 'New Chat',
    createdAt: Date.now(),
    messages: [
      {
        role: 'assistant',
        content:
          'Hello, I am your local AI assistant running fully on your machine. How can I help you today?',
      },
    ],
  }
}

function App() {
  const [chats, setChats] = useState(() => [createInitialChat()])
  const [activeChatId, setActiveChatId] = useState(() => chats[0]?.id ?? null)
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const messagesEndRef = useRef(null)

  const activeChat = useMemo(
    () => chats.find((c) => c.id === activeChatId) ?? chats[0] ?? null,
    [chats, activeChatId],
  )

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [activeChat?.messages.length])

  function handleNewChat() {
    if (isStreaming) return
    const nextChat = createInitialChat()
    setChats((prev) => [nextChat, ...prev])
    setActiveChatId(nextChat.id)
    setInput('')
    setError('')
  }

  function handleSelectChat(id) {
    if (isStreaming) return
    setActiveChatId(id)
    setError('')
  }

  async function handleSend(e) {
    e.preventDefault()
    setError('')

    const text = input.trim()
    if (!text || isStreaming || !activeChat) return

    const updatedChats = chats.map((chat) => {
      if (chat.id !== activeChat.id) return chat
      const updatedMessages = [
        ...chat.messages,
        { role: 'user', content: text },
        { role: 'assistant', content: '' },
      ]
      const newTitle =
        chat.title === 'New Chat' && text
          ? text.length > 36
            ? text.slice(0, 33) + '...'
            : text
          : chat.title

      return {
        ...chat,
        title: newTitle,
        messages: updatedMessages,
      }
    })

    setChats(updatedChats)
    setInput('')
    setIsStreaming(true)

    const currentChat = updatedChats.find((c) => c.id === activeChat.id)

    try {
      if (!currentChat) {
        throw new Error('Active chat not found')
      }
      await streamChat(currentChat.id, currentChat.messages)
    } catch (err) {
      console.error(err)
      setError('Unable to connect to the local AI backend. Please check that it is running.')
      setIsStreaming(false)
    }
  }

  async function streamChat(chatId, history) {
    const controller = new AbortController()
    const body = JSON.stringify({
      model: MODEL_NAME,
      messages: history.map((m) => ({ role: m.role, content: m.content })),
      stream: true,
    })

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
          const tokenText = data.message?.content ?? ''
          if (!tokenText) continue

          setChats((prev) =>
            prev.map((chat) => {
              if (chat.id !== chatId) return chat
              const updatedMessages = [...chat.messages]
              const lastIndex = updatedMessages.length - 1

              if (lastIndex >= 0 && updatedMessages[lastIndex].role === 'assistant') {
                updatedMessages[lastIndex] = {
                  ...updatedMessages[lastIndex],
                  content: updatedMessages[lastIndex].content + tokenText,
                }
              }

              return { ...chat, messages: updatedMessages }
            }),
          )
        } catch (e) {
          console.error('Failed to parse stream chunk', e)
        }
      }
    }

    setIsStreaming(false)
  }

  const filteredChats = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return chats
    return chats.filter(
      (chat) =>
        chat.title.toLowerCase().includes(term) ||
        chat.messages.some((m) => m.content.toLowerCase().includes(term)),
    )
  }, [chats, searchTerm])

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="header-left">
          <button
            type="button"
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen((open) => !open)}
          >
            ☰
          </button>
          <div>
            <div className="header-title">Local AI Chat</div>
            <div className="header-subtitle">Runs 100% on your machine using Ollama &quot;chain&quot;</div>
          </div>
        </div>
      </header>

      <div className="app-layout">
        <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="sidebar-inner">
            <button
              type="button"
              className="new-chat-btn"
              onClick={handleNewChat}
              disabled={isStreaming}
            >
              + New Chat
            </button>

            <div className="sidebar-section">
              <div className="sidebar-label">Search</div>
              <input
                className="sidebar-search"
                type="text"
                placeholder="Search your chats…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="sidebar-section sidebar-chats">
              <div className="sidebar-label">Your Chats</div>
              <div className="chat-list">
                {filteredChats.length === 0 && (
                  <div className="chat-list-empty">No chats match your search.</div>
                )}
                {filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    type="button"
                    className={`chat-list-item ${
                      chat.id === activeChat?.id ? 'chat-list-item-active' : ''
                    }`}
                    onClick={() => handleSelectChat(chat.id)}
                  >
                    <div className="chat-list-title">{chat.title || 'Untitled chat'}</div>
                    <div className="chat-list-meta">
                      {new Date(chat.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="chat-shell">
          <section className="chat-window">
            <div className="messages-scroll">
              {activeChat?.messages.map((m, idx) => (
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
              placeholder="Send a message…"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isStreaming || !activeChat}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend(e)
                }
              }}
            />
            <button
              className="send-btn"
              type="submit"
              disabled={isStreaming || !input.trim() || !activeChat}
            >
              {isStreaming ? 'Streaming…' : 'Send'}
            </button>
          </form>

          <footer className="app-footer">
            <span>Local AI Chat • Powered by Ollama &quot;chain&quot; • Runs 100% Offline</span>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default App
