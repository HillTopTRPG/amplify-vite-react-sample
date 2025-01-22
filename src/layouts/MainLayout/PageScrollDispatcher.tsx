import { type RefObject, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useDebounce } from '@/hooks/useDebounce.tsx'
import { scrollMapSelector, useSelector } from '@/store'
import { updateScrollMap } from '@/store/scrollMapSlice.ts'

interface Props {
  scrollContainer: RefObject<HTMLElement>
  forceTop?: boolean
}
export default function PageScrollDispatcher({
  scrollContainer,
  forceTop,
}: Props) {
  const dispatch = useDispatch()
  const scrollMap = useSelector(scrollMapSelector)
  const debounce = useDebounce(100)
  const { pathname } = useLocation()

  const onScroll = useCallback(
    (e: Event) => {
      const scrollTop = (e.target as HTMLElement)?.scrollTop ?? 0
      debounce(() => {
        // eslint-disable-next-line no-console
        console.log('scrolled', scrollTop)
        dispatch(
          updateScrollMap({
            key: pathname,
            value: scrollTop,
          }),
        )
      })
    },
    [debounce, dispatch, pathname],
  )

  useEffect(() => {
    const elm = scrollContainer.current
    if (!elm) return
    if (scrollMap && pathname in scrollMap) {
      setTimeout(() => elm.scroll(0, forceTop ? 0 : (scrollMap[pathname] ?? 0)))
    }
    elm.addEventListener('scroll', onScroll, {
      capture: true,
    })
    return () => {
      elm.removeEventListener('scroll', onScroll)
    }
  }, [scrollContainer, scrollMap, pathname, onScroll, forceTop])

  return <></>
}
