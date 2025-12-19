export function ModalBase({ open, title, children, onClose }) {
  if (!open) return null

  return (
    <div 
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm dark:bg-black/60 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl shadow-black/20 dark:border-zinc-800 dark:bg-zinc-950 slide-in-from-bottom-2">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-xs text-zinc-500 transition-all duration-200 ease-out hover:bg-zinc-100 hover:text-zinc-800 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-white dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 dark:focus:ring-zinc-600 dark:focus:ring-offset-zinc-950"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">{children}</div>
      </div>
    </div>
  )
}


