import { useLayoutEffect, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce.tsx'

export const useWindowSize = (): number[] => {
  const [size, setSize] = useState([0, 0])
  const debounce = useDebounce(50)
  useLayoutEffect(() => {
    const updateSize = (): void => {
      debounce(() => setSize([window.innerWidth, window.innerHeight]))
    }

    window.addEventListener('resize', updateSize, { passive: true })
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [debounce])
  return size
}
