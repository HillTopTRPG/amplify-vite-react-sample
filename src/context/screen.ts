import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import constate from 'constate'
import { MEDIA_QUERY } from '@/const/style.ts'
import { useWindowSize } from '@/hooks/useWindowSize.ts'
import { type Screens } from '@/layouts/MainContentsLauout.tsx'

const useScreen = ({
  service,
  screens,
  screen,
}: {
  service: string
  screens: Screens
  screen: keyof Screens
}) => {
  const navigate = useNavigate()

  const [open, setOpenStatus] = useState(false)

  const screenIcon = screens[screen].icon
  const screenLabel = screens[screen].label
  const screenContents = screens[screen].contents
  const toggleOpenStatus = () => setOpenStatus((v) => !v)

  const setScreen = (screen: keyof Screens) => {
    const suffix = screen === 'index' ? '' : `/${screen}`
    navigate(`/${service}${suffix}`)
  }

  const setService = (service: string) => {
    navigate(`/${service}`)
  }

  const [width] = useWindowSize()
  const isMobile = width < MEDIA_QUERY.MOBILE.maxWidth
  const isPC = width >= MEDIA_QUERY.PC.minWidth
  const isFullView = width >= MEDIA_QUERY.FULL_VIEW.minWidth
  const siderWidth = open ? 200 : 50
  const viewPortWidth = (isPC ? width - siderWidth : width) - 16 * 2

  return {
    service,
    setService,
    screens,
    screen,
    setScreen,
    screenIcon,
    screenLabel,
    screenContents,
    open,
    setOpenStatus,
    toggleOpenStatus,
    screenSize: {
      width,
      isMobile,
      isPC,
      isFullView,
      viewPortWidth,
    },
  }
}

export const [ScreenProvider, useScreenContext] = constate(useScreen)
