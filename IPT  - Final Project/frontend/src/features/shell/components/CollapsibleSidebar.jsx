import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLocalStorage } from '../../shared/hooks/useLocalStorage'

export function CollapsibleSidebar({ children, onCollapseChange }) {
  const [isCollapsed, setIsCollapsed] = useLocalStorage('sidebarCollapsed', false)

  const handleToggle = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    if (onCollapseChange) {
      onCollapseChange(newState)
    }
  }

  return (
    <aside
      className={`hidden md:flex sticky top-0 h-screen flex-col border-r border-zinc-200 bg-zinc-50 transition-all duration-500 ease-in-out dark:border-zinc-800 dark:bg-zinc-950 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {children({ isCollapsed, onToggle: handleToggle })}
        </div>
      </div>
    </aside>
  )
}

export function SidebarSection({ children, className = '', isCollapsed = false }) {
  return (
    <div className={`${isCollapsed ? 'px-2' : 'px-3'} transition-all duration-300 ease-out ${className}`}>
      {children}
    </div>
  )
}

export function SidebarItem({ 
  icon: Icon, 
  label, 
  onClick, 
  isActive = false, 
  tooltip,
  isCollapsed = false 
}) {
  const content = (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ease-out ${
        isActive
          ? 'bg-zinc-200 text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
          : 'text-zinc-700 hover:bg-zinc-100 hover:shadow-sm dark:text-zinc-300 dark:hover:bg-zinc-900/50'
      } ${isCollapsed ? 'justify-center px-2' : ''}`}
      title={isCollapsed && tooltip ? tooltip : undefined}
    >
      {Icon && <Icon className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isActive ? 'scale-105' : ''}`} />}
      {!isCollapsed && <span className="truncate font-medium">{label}</span>}
    </button>
  )

  if (isCollapsed && tooltip) {
    return (
      <div className="group relative">
        {content}
        <div className="absolute left-full ml-2 px-2.5 py-1.5 text-xs font-medium text-white bg-zinc-900 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 shadow-lg dark:bg-zinc-800 border border-zinc-700 dark:border-zinc-700">
          {tooltip}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-zinc-900 dark:bg-zinc-800 border-l border-b border-zinc-700 dark:border-zinc-700 rotate-45 -ml-1"></div>
        </div>
      </div>
    )
  }

  return content
}

