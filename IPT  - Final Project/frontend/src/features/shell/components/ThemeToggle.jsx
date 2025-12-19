import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../shared/contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-all duration-200 ease-out hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 hover:shadow-md hover:scale-105 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative h-4 w-4">
        <Sun className={`absolute inset-0 h-4 w-4 transition-all duration-300 ease-out ${theme === 'dark' ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-0'}`} />
        <Moon className={`absolute inset-0 h-4 w-4 transition-all duration-300 ease-out ${theme === 'light' ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-0'}`} />
      </div>
    </button>
  )
}

