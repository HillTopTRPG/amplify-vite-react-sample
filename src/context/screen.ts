import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import constate from 'constate'
import { MEDIA_QUERY } from '@/const/style.ts'
import { useWindowSize } from '@/hooks/useWindowSize.ts'
import { type Screen } from '@/service'

const useScreen = ({
  service,
  screens,
  screen,
}: {
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

  const setScreen = (screen: keyof typeof screens) => {
    const userSection = userName ? `/${userName}` : ''
    const suffix = screen === 'index' ? '' : `/${screen}`
    navigate(`${userSection}/${service}${suffix}`)
  }

  const setService = (
    services: Record<string, { screens: Record<string, unknown> }>,
    service: keyof typeof services,
  ) => {
    const userSection = userName ? `/${userName}` : ''
    const useScreen = screen in services[service].screens ? screen : 'index'
    const suffix = useScreen === 'index' ? '' : `/${useScreen}`
    if (screen in services[service]) return
    // const suffix = screen === 'index' ? '' : `/${screen}`
    navigate(`${userSection}/${service}${suffix}`)
  }

  const setUser = (user: string) => {
    const suffix = screen === 'index' ? '' : `/${screen}`
    navigate(`/${user}/${service}${suffix}`)
  }

  const [width] = useWindowSize()
  const isMobile = width < MEDIA_QUERY.MOBILE.maxWidth
  const isPC = width >= MEDIA_QUERY.PC.minWidth
  const isFullView = width >= MEDIA_QUERY.FULL_VIEW.minWidth
  const siderWidth = open ? 200 : 50
  const viewPortWidth = (isPC ? width - siderWidth : width) - 16 * 2

  return {
    userName,
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
