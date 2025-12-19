import { useCallback, useEffect, useState } from 'react'

/**
 * Stable localStorage hook.
 *
 * - Reads once on mount (and when `key` changes)
 * - Writes only when `setValue` is called
 * - Avoids effects that depend on values that change every render
 */
export function useLocalStorage(key, defaultValue) {
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') return defaultValue

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      // If JSON.parse fails or access errors, fall back to default
      return defaultValue
    }
    // We intentionally do NOT include `defaultValue` here so that a new
    // object/array/function passed on each render does not recreate
    // this callback and re-trigger effects.
  }, [key])

  // Lazy init so we only hit localStorage on first render for this key
  const [storedValue, setStoredValue] = useState(() => readValue())

  // Keep state in sync if the key itself changes.
  useEffect(() => {
    setStoredValue(readValue())
  }, [readValue])

  const setValue = useCallback(
    (value) => {
      try {
        setStoredValue((prev) => {
          const nextValue = value instanceof Function ? value(prev) : value

          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(nextValue))
          }

          return nextValue
        })
      } catch {
        // Fail silently to keep UX calm
      }
    },
    [key],
  )

  return [storedValue, setValue]
}

