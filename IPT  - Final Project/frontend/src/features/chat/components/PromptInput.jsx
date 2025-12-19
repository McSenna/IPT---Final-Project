import { Send } from 'lucide-react'

export function PromptInput({ value, onChange, onSubmit, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit(e)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="group relative w-full rounded-lg border border-zinc-200 bg-white shadow-sm transition-all duration-200 focus-within:border-zinc-300 focus-within:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:border-zinc-700"
    >
      <label className="sr-only" htmlFor="prompt">
        Prompt
      </label>
      <div className="flex items-end gap-2 p-2">
        <textarea
          id="prompt"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask Mental Block about any blockchain primitive, protocol, or transaction..."
          disabled={disabled}
          className="max-h-32 flex-1 resize-none border-0 bg-transparent px-2 py-1.5 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-500 focus:outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder:text-zinc-400"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-900 text-zinc-50 shadow-sm transition-all duration-200 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  )
}


