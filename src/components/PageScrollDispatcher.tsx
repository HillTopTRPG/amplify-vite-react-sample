import { type RefObject, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useScreenContext } from '@/context/screenContext.ts'
import { useDebounce } from '@/hooks/useDebounce.tsx'

export default function PageScrollDispatcher({
  scrollContainer,
}: {
  scrollContainer: RefObject<HTMLElement>
}) {
  const { scrollMap, setScrollMap } = useScreenContext()
  const debounce = useDebounce(100)
  const { pathname } = useLocation()

  const onScroll = useCallback(
    (e: Event) => {
      const scrollTop = (e.target as HTMLElement)?.scrollTop ?? 0
      debounce(() => {
        // eslint-disable-next-line no-console
        console.log('scrolled', scrollTop)
        setScrollMap((v) => ({
          ...v,
          [pathname]: scrollTop,
        }))
      })
    },
    [debounce, pathname, setScrollMap],
  )

  useEffect(() => {
    const elm = scrollContainer.current
    if (!elm) return
    elm.scroll(0, scrollMap[pathname] ?? 0)
    elm.addEventListener('scroll', onScroll, {
      capture: true,
    })
    return () => {
      elm.removeEventListener('scroll', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollContainer, scrollMap[pathname], onScroll])

  return <></>
}
