import { useCallback, useRef } from 'react'

type Debounce = (fn: () => void) => void

export const useDebounce = (timeout: number): Debounce => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  return useCallback(
    (fn) => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
      timer.current = setTimeout(() => {
        fn()
      }, timeout)
    },
    [timeout],
  )
}
