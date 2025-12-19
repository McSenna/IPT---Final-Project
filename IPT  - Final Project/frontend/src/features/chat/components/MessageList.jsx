export function MessageList({ messages, isStreaming }) {
  if (!messages?.length) {
    return null
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex w-full transition-opacity duration-300 ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm transition-all duration-200 ${
              message.role === 'user'
                ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100'
                : 'border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100'
            }`}
          >
            <div className="whitespace-pre-wrap break-words">{message.content}</div>
          </div>
        </div>
      ))}

      {isStreaming && (
        <div className="flex justify-start">
          <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-zinc-400" />
            </span>
            Thinking…
          </div>
        </div>
      )}
    </div>
  )
}


