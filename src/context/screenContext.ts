import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import constate from 'constate'
import { MEDIA_QUERY } from '@/const/style.ts'
import { useWindowSize } from '@/hooks/useWindowSize.ts'
import { type Scope, type Screen, type Services } from '@/service'

const useScreen = ({ screens }: { screens: Record<string, Screen> }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const baseUrl = window.location.href.replace(location.pathname, '')
  const { userName } = useParams()

  const [scope, service, screenRaw, urlParam] = location.pathname
    .split('/')
    .slice(1)
  const screen = screenRaw
    ? urlParam
      ? screenRaw.replace(/s$/, '')
      : screenRaw
    : 'index'
  console.log(JSON.stringify({ scope, service, screen, urlParam }, null, 2))

  const [open, setOpenStatus] = useState(false)

  const screenIcon = screens[screen].icon
  const screenLabel = screens[screen].label
  const screenContents = screens[screen].contents
  const toggleOpenStatus = () => setOpenStatus((v) => !v)

  const getScreenBlock = (screen: keyof typeof screens) => {
    return `/${screen.replace('ForGuest', '')}`.replace('/index', '')
  }

  const getScreenPathName = (
    screen: keyof typeof screens,
    props?: {
      scope?: Scope
      userName?: string
      service?: string
      urlParam?: string
      queryParam?: Record<string, string>
    },
  ) => {
    const useUserName = props?.userName ?? userName

    const userBlock = useUserName ? `/${useUserName}` : ''
    const urlParamBlock = props?.urlParam ? `/${props.urlParam}` : ''
    const queryParamBlock = props?.queryParam
      ? `/?${new URLSearchParams(props.queryParam).toString()}`
      : ''
    return `/${props?.scope ?? scope}${userBlock}/${props?.service ?? service}${getScreenBlock(screen)}${urlParamBlock}${queryParamBlock}`
  }

  const setScreen = (
    screen: keyof typeof screens,
    props?: {
      scope?: Scope
      userName?: string
      service?: string
      urlParam?: string
      queryParam?: Record<string, string>
    },
  ) => {
    navigate(getScreenPathName(screen, props))
  }

  const getScreenUrl = (
    screen: keyof typeof screens,
    props?: {
      scope?: Scope
      userName?: string
      service?: string
      urlParam?: string
      queryParam?: Record<string, string>
    },
  ) => `${baseUrl}${getScreenPathName(screen, props)}`

  const setService = (services: Services, service: keyof typeof services) => {
    const useScreen = screen in services[service].screens ? screen : 'index'
    const userSection = userName ? `/${userName}` : ''
    navigate(`/${scope}${userSection}/${service}${getScreenBlock(useScreen)}`)
  }

  const setUser = (userName: string | null) => {
    const userSection = userName ? `/${userName}` : ''
    navigate(`/${scope}${userSection}/${service}${getScreenBlock(screen)}`)
  }

  const setScope = (scope: Scope) => {
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
    getScreenUrl,
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
