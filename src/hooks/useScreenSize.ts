import { useMemo } from 'react'
import { MEDIA_QUERY } from '@/const/style.ts'
import { useWindowSize } from '@/hooks/useWindowSize.ts'

export type ScreenSize = {
  width: number
  isMobile: boolean
  isPC: boolean
  isFullView: boolean
  viewPortWidth: number
}

export default function useScreenSize(open: boolean) {
  const [width] = useWindowSize()
  const isMobile = useMemo(() => width < MEDIA_QUERY.MOBILE.maxWidth, [width])
  const isPC = useMemo(() => width >= MEDIA_QUERY.PC.minWidth, [width])
  const isFullView = useMemo(
    () => width >= MEDIA_QUERY.FULL_VIEW.minWidth,
    [width],
  )
  const siderWidth = useMemo(() => (open ? 200 : 50), [open])
  const viewPortWidth = useMemo(
    () => (isPC ? width - siderWidth : width) - 12 * 2,
    [isPC, siderWidth, width],
  )

  return {
    width,
    isMobile,
    isPC,
    isFullView,
    viewPortWidth,
  }
}
