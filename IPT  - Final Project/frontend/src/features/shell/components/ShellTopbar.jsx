import { useState } from 'react'
import { MoreVertical } from 'lucide-react'
import { TopbarMenu } from './TopbarMenu'
import { ThemeToggle } from './ThemeToggle'

export function ShellTopbar({ onOpenModal, model, onModelChange }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-25 border-b border-zinc-200 bg-zinc-50/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        {/* Left side - Empty for balance */}
        <div className="flex items-center gap-2">
          {/* Spacer for visual balance */}
        </div>
       
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="text-zinc-500 dark:text-zinc-500">Model</span>
            <select
              value={model}
              onChange={(e) => onModelChange?.(e.target.value)}
              className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-900 shadow-sm outline-none transition-all duration-200 hover:border-zinc-300 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-700 dark:focus:border-zinc-600"
            >
              <option value="chain">Chain (default)</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-all duration-200 ease-out hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 hover:shadow-md hover:scale-105 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              aria-label="Open menu"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            <TopbarMenu
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
              onSelect={(item) => {
                setMenuOpen(false)
                onOpenModal(item)
              }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}