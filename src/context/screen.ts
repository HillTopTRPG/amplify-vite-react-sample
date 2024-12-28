import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import constate from 'constate'
import { MEDIA_QUERY } from '@/const/style.ts'
import { useWindowSize } from '@/hooks/useWindowSize.ts'
import { type Screen } from '@/service'

const useScreen = ({
  scope,
  service,
  screens,
  screen,
}: {
  scope: 'private' | 'public'
  service: string
  screens: Record<string, Screen>
  screen: keyof typeof screens
}) => {
  const navigate = useNavigate()
  const { userName } = useParams()

  const [open, setOpenStatus] = useState(false)

  const screenIcon = screens[screen].icon
  const screenLabel = screens[screen].label
  const screenContents = screens[screen].contents
  const toggleOpenStatus = () => setOpenStatus((v) => !v)

  const getScreenBlock = (screen: keyof typeof screens) => {
    return `/${screen.replace('ForGuest', '')}`.replace('/index', '')
  }

  const setScreen = (
    screen: keyof typeof screens,
    params?: Record<string, string>,
  ) => {
    const userSection = userName ? `/${userName}` : ''
    const paramsStr = params
      ? `/?${new URLSearchParams(params).toString()}`
      : ''
    navigate(
      `/${scope}${userSection}/${service}${getScreenBlock(screen)}${paramsStr}`,
    )
  }

  const setService = (
    services: Record<string, { screens: Record<string, unknown> }>,
    service: keyof typeof services,
  ) => {
    const useScreen = screen in services[service].screens ? screen : 'index'
    const userSection = userName ? `/${userName}` : ''
    navigate(`/${scope}${userSection}/${service}${getScreenBlock(useScreen)}`)
  }

  const setUser = (userName: string | null) => {
    const userSection = userName ? `/${userName}` : ''
    navigate(`/${scope}${userSection}/${service}${getScreenBlock(screen)}`)
  }

  const setScope = (scope: 'private' | 'public') => {
    const userSection = userName ? `/${userName}` : ''
    navigate(`/${scope}${userSection}/${service}${getScreenBlock(screen)}`)
  }

  const getCurrentPageNav = () => {
    const userSection = userName ? `/${userName}` : ''
    return `/${scope}${userSection}/${service}${getScreenBlock(screen)}`
  }

  const [width] = useWindowSize()
  const isMobile = width < MEDIA_QUERY.MOBILE.maxWidth
  const isPC = width >= MEDIA_QUERY.PC.minWidth
  const isFullView = width >= MEDIA_QUERY.FULL_VIEW.minWidth
  const siderWidth = open ? 200 : 50
  const viewPortWidth = (isPC ? width - siderWidth : width) - 16 * 2

  return {
    userName,
    scope,
    setScope,
    setUser,
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
    getCurrentPageNav,
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
