import { useState } from 'react'
import { ChatLayout } from './features/chat/ChatLayout'
import { useChat } from './features/chat/hooks/useChat'
import { AboutModal } from './features/shell/components/AboutModal'
import { TermsModal } from './features/shell/components/TermsModal'
import { PrivacyModal } from './features/shell/components/PrivacyModal'
import { ShellTopbar } from './features/shell/components/ShellTopbar'
import { SystemHealthModal } from './features/shell/components/SystemHealthModal'
import { CollapsibleSidebar, SidebarSection, SidebarItem } from './features/shell/components/CollapsibleSidebar'
import { Activity, ChevronLeft, ChevronRight } from 'lucide-react'

function App() {
  const {
    messages,
    input,
    isStreaming,
    error,
    sendMessage,
    setInput,
    resetConversation,
    loadConversation,
  } = useChat()

  const [openModal, setOpenModal] = useState(null)
  const [activeSessionId, setActiveSessionId] = useState('current')
  const [sessions, setSessions] = useState([])
  const [selectedModel, setSelectedModel] = useState('chain')

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(selectedModel)
  }

  const handleNewChat = () => {
    const hasUserMessages = messages?.some((m) => m.role === 'user')

    if (hasUserMessages) {
      const lastMessage = messages[messages.length - 1]
      const firstUserMessage = messages.find((m) => m.role === 'user') || lastMessage

      const makePreview = (text, max) =>
        text.length > max ? `${text.slice(0, max).trim()}…` : text

      const title = makePreview(firstUserMessage.content, 50)
      const lastMessagePreview = makePreview(lastMessage.content, 70)

      const session = {
        id: crypto.randomUUID(),
        title,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        lastMessagePreview,
        messages,
      }

      setSessions((prev) => [session, ...prev])
      setActiveSessionId('current')
    }

    resetConversation()
    setActiveSessionId('current')
  }

  const hasUserMessages = messages?.some((m) => m.role === 'user')

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 antialiased overflow-hidden">
      {/* Collapsible Sidebar */}
      <CollapsibleSidebar>
        {({ isCollapsed, onToggle }) => (
          <>
            {/* Sidebar Header */}
            <SidebarSection className="py-4 border-b border-zinc-200 dark:border-zinc-800" isCollapsed={isCollapsed}>
              <div className={`flex items-center gap-2.5 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                <div className={`flex items-center gap-2.5 transition-all duration-300 ease-out ${isCollapsed ? 'justify-center' : ''}`}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800 shrink-0 transition-all duration-300 ease-out">
                    <div className="h-4 w-4 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                      <span className="h-2 w-2 rounded-sm bg-zinc-500 dark:bg-zinc-400 block mt-0.5 ml-0.5" />
                    </div>
                  </div>
                  {!isCollapsed && (
                    <div className="flex flex-col min-w-0 transition-opacity duration-300 ease-out">
                      <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        Mental Block
                      </span>
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                        AI Terminal
                      </span>
                    </div>
                  )}
                </div>
                {!isCollapsed && (
                  <span className="shrink-0">
                    <button
                      type="button"
                      onClick={onToggle}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-600 transition-all duration-300 ease-out hover:bg-zinc-100 hover:text-zinc-900 hover:scale-110 active:scale-95 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                      aria-label="Collapse sidebar"
                    >
                      <ChevronLeft className="h-4 w-4 transition-transform duration-300 ease-out" />
                    </button>
                  </span>
                )}
                {isCollapsed && (
                  <span className="shrink-0">
                    <button
                      type="button"
                      onClick={onToggle}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-600 transition-all duration-300 ease-out hover:bg-zinc-100 hover:text-zinc-900 hover:scale-110 active:scale-95 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                      aria-label="Expand sidebar"
                    >
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 ease-out" />
                    </button>
                  </span>
                )}
              </div>
            </SidebarSection>

            {/* New Chat Button */}
            <SidebarSection className="pt-4" isCollapsed={isCollapsed}>
              <button
                type="button"
                onClick={handleNewChat}
                className={`w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-xs font-medium text-zinc-900 shadow-sm transition-all duration-300 ease-out hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 ${
                  isCollapsed ? 'px-2' : ''
                }`}
                title={isCollapsed ? 'New chat' : undefined}
              >
                <span className={`inline-flex items-center gap-2 transition-all duration-300 ease-out ${isCollapsed ? 'justify-center' : ''}`}>
                  <span className="text-sm font-semibold">+</span>
                  {!isCollapsed && <span className="transition-opacity duration-300 ease-out">New chat</span>}
                </span>
              </button>
            </SidebarSection>

            {/* Recent Chats */}
            <div className={`flex-1 overflow-y-auto py-4 min-h-0 transition-all duration-300 ease-out ${isCollapsed ? 'px-2' : 'px-3'}`}>
              {!isCollapsed && (
                <p className="mb-3 px-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 transition-opacity duration-300 ease-out">
                  Recent
                </p>
              )}
              <nav className="space-y-1">
                {sessions.length === 0 ? (
                  !isCollapsed && (
                    <p className="px-3 py-3 text-xs text-zinc-500 dark:text-zinc-400 transition-opacity duration-300 ease-out">
                      No recent conversations
                    </p>
                  )
                ) : (
                  sessions.map((session) => {
                    const isActive = session.id === activeSessionId

                    return (
                      <button
                        key={session.id}
                        type="button"
                        onClick={() => {
                          setActiveSessionId(session.id)
                          loadConversation(session.messages)
                        }}
                        className={`w-full rounded-lg px-3 py-2.5 text-left transition-all duration-300 ease-out ${
                          isActive
                            ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900/50'
                        } ${isCollapsed ? 'px-2 text-center' : ''}`}
                        title={isCollapsed ? session.title : undefined}
                      >
                        {isCollapsed ? (
                          <div className="flex flex-col items-center">
                            <div className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-500 mb-1" />
                          </div>
                        ) : (
                          <>
                            <p className="truncate text-xs font-medium">{session.title}</p>
                            <p className="mt-0.5 line-clamp-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                              {session.lastMessagePreview}
                            </p>
                          </>
                        )}
                      </button>
                    )
                  })
                )}
              </nav>
            </div>

            
            {/* Utility Actions Section */}
            <SidebarSection className="pt-3 pb-2 border-b border-zinc-200 dark:border-zinc-800" isCollapsed={isCollapsed}>
              {!isCollapsed && (
                <p className="mb-2 px-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 transition-opacity duration-300 ease-out">
                  System
                </p>
              )}
              <SidebarItem
                icon={Activity}
                label="System Health"
                onClick={() => setOpenModal('system-health')}
                isCollapsed={isCollapsed}
                tooltip="System Health"
              />
            </SidebarSection>

          </>
        )}
      </CollapsibleSidebar>

      

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Sticky Top Bar */}
        <ShellTopbar
          onNewChat={handleNewChat}
          onOpenModal={setOpenModal}
          model={selectedModel}
          onModelChange={setSelectedModel}
        />

        {/* Scrollable Chat Area */}
        <div className="flex-1 overflow-hidden">
          <ChatLayout
            messages={messages}
            input={input}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            isStreaming={isStreaming}
            error={error}
            showEmptyState={!hasUserMessages}
          />
        </div>

        {/* Modals */}
        <AboutModal open={openModal === 'about'} onClose={() => setOpenModal(null)} />
        <TermsModal open={openModal === 'terms'} onClose={() => setOpenModal(null)} />
        <PrivacyModal open={openModal === 'privacy'} onClose={() => setOpenModal(null)} />
        <SystemHealthModal
          open={openModal === 'system-health'}
          onClose={() => setOpenModal(null)}
          status="LIVE"
        />
      </div>
    </div>
  )
}

export default App
