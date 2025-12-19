import { createContext, useContext, useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ThemeContext = createContext(undefined)

export function ThemeProvider({ children }) {
  const [storedTheme, setStoredTheme] = useLocalStorage('theme', null)
  
  // Initialize theme: check localStorage first, then system preference
  const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'light'
    
    // If we have a stored theme, use it
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme
    }
    
    // Otherwise, check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  
  const [theme, setTheme] = useState(getInitialTheme)

  // Apply theme to document root immediately on mount and when theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const root = window.document.documentElement
    
    // Remove both classes first to avoid conflicts
    root.classList.remove('light', 'dark')
    
    // Add current theme class
    root.classList.add(theme)
    
    // Update localStorage when theme changes (but avoid infinite loops)
    if (storedTheme !== theme) {
      setStoredTheme(theme)
    }
  }, [theme, setStoredTheme, storedTheme])

  // Sync with storedTheme changes from localStorage (e.g., from another tab)
  useEffect(() => {
    if (storedTheme === 'light' || storedTheme === 'dark') {
      if (storedTheme !== theme) {
        setTheme(storedTheme)
      }
    }
  }, [storedTheme, theme])

  // Listen for system theme changes only if no stored preference
  useEffect(() => {
    if (storedTheme !== null) return // User has explicitly set a preference
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    // Set initial theme from system preference
    handleChange(mediaQuery)
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [storedTheme])

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

