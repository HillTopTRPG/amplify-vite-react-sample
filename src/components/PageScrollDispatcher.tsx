import { type RefObject, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useScreenContext } from '@/context/screenContext.ts'
import { useDebounce } from '@/hooks/useDebounce.tsx'

export default function PageScrollDispatcher({
  scrollContainer,
  forceTop = false,
}: {
  scrollContainer: RefObject<HTMLElement>
  forceTop?: boolean
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
    setTimeout(() => elm.scroll(0, forceTop ? 0 : (scrollMap[pathname] ?? 0)))
    elm.addEventListener('scroll', onScroll, {
      capture: true,
    })
    return () => {
      elm.removeEventListener('scroll', onScroll)
    }
  }, [scrollContainer, scrollMap, pathname, onScroll, forceTop])

  return <></>
}
