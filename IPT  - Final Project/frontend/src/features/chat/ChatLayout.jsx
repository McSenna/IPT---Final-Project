import { MessageList } from './components/MessageList'
import { PromptInput } from './components/PromptInput'
import { EmptyState } from './components/EmptyState'

export function ChatLayout({
  messages,
  input,
  onInputChange,
  onSubmit,
  isStreaming,
  error,
  showEmptyState,
}) {
  const handlePromptSelect = (prompt) => {
    onInputChange(prompt)
  }

  return (
    <div className="flex h-full flex-col">
      {/* Scrollable Chat Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto flex h-full max-w-3xl flex-col px-4 py-6">
          {showEmptyState ? (
            <EmptyState onPromptSelect={handlePromptSelect} />
          ) : (
            <div className="space-y-6 pb-24">
              <MessageList messages={messages} isStreaming={isStreaming} />
              {error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-800 dark:bg-red-950/50 dark:text-red-200">
                  {error}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </main>

      {/* Sticky Input Area */}
      <div className="sticky bottom-0 border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <PromptInput
            value={input}
            onChange={onInputChange}
            onSubmit={onSubmit}
            disabled={isStreaming}
          />
          
        </div>
      </div>
    </div>
  )
}


