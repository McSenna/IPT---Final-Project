export function TopbarMenu({ open, onClose, onSelect }) {
  if (!open) return null

  return (
    <div
      className="absolute right-0 mt-2 w-44 overflow-hidden rounded-lg border border-zinc-200 bg-white py-1 text-sm shadow-xl shadow-black/10 dark:border-zinc-800 dark:bg-zinc-900 animate-in fade-in slide-in-from-bottom-2"
      role="menu"
    >
      <button
        type="button"
        onClick={() => {
          onSelect('about')
        }}
        className="flex w-full items-center px-3 py-1.5 text-left text-zinc-700 transition-all duration-200 ease-out hover:bg-zinc-100 hover:text-zinc-900 focus:bg-zinc-100 focus:outline-none dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
        role="menuitem"
      >
        About
      </button>
      <button
        type="button"
        onClick={() => {
          onSelect('terms')
        }}
        className="flex w-full items-center px-3 py-1.5 text-left text-zinc-700 transition-all duration-200 ease-out hover:bg-zinc-100 hover:text-zinc-900 focus:bg-zinc-100 focus:outline-none dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
        role="menuitem"
      >
        Terms
      </button>
      <button
        type="button"
        onClick={() => {
          onSelect('privacy')
        }}
        className="flex w-full items-center px-3 py-1.5 text-left text-zinc-700 transition-all duration-200 ease-out hover:bg-zinc-100 hover:text-zinc-900 focus:bg-zinc-100 focus:outline-none dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
        role="menuitem"
      >
        Privacy Policy
      </button>
      <button
        type="button"
        onClick={onClose}
        className="mt-0.5 flex w-full items-center border-t border-zinc-100 px-3 py-1.5 text-left text-xs text-zinc-400 transition-all duration-200 ease-out hover:bg-zinc-50 hover:text-zinc-600 focus:bg-zinc-50 focus:outline-none dark:border-zinc-800 dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
      >
        Close
      </button>
    </div>
  )
}


