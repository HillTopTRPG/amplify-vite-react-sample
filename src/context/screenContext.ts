import { useCallback, useMemo, useState } from 'react'
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

  const screen = useMemo(
    () =>
      screenRaw
        ? urlParam
          ? screenRaw.replace(/s$/, '')
          : screenRaw
        : 'index',
    [screenRaw, urlParam],
  )

  const [open, setOpenStatus] = useState(false)

  const screenIcon = useMemo(() => screens[screen].icon, [screen, screens])
  const screenLabel = useMemo(() => screens[screen].label, [screen, screens])
  const screenContents = useMemo(
    () => screens[screen].contents,
    [screen, screens],
  )
  const toggleOpenStatus = useCallback(() => setOpenStatus((v) => !v), [])

  const getScreenBlock = useCallback((screen: keyof typeof screens) => {
    return `/${screen.replace('ForGuest', '')}`.replace('/index', '')
  }, [])

  const getScreenPathName = useCallback(
    (
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
    },
    [getScreenBlock, scope, service, userName],
  )

  const setScreen = useCallback(
    (
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
    },
    [getScreenPathName, navigate],
  )

  const getScreenUrl = useCallback(
    (
      screen: keyof typeof screens,
      props?: {
        scope?: Scope
        userName?: string
        service?: string
        urlParam?: string
        queryParam?: Record<string, string>
      },
    ) => `${baseUrl}${getScreenPathName(screen, props)}`,
    [baseUrl, getScreenPathName],
  )

  const setService = useCallback(
    (services: Services, service: keyof typeof services) => {
      const useScreen = screen in services[service].screens ? screen : 'index'
      const userSection = userName ? `/${userName}` : ''
      navigate(`/${scope}${userSection}/${service}${getScreenBlock(useScreen)}`)
    },
    [getScreenBlock, navigate, scope, screen, userName],
  )

  const setUser = useCallback(
    (userName: string | null) => {
      const userSection = userName ? `/${userName}` : ''
      navigate(`/${scope}${userSection}/${service}${getScreenBlock(screen)}`)
    },
    [getScreenBlock, navigate, scope, screen, service],
  )

  const setScope = useCallback(
    (scope: Scope) => {
      const userSection = userName ? `/${userName}` : ''
      navigate(`/${scope}${userSection}/${service}${getScreenBlock(screen)}`)
    },
    [getScreenBlock, navigate, screen, service, userName],
  )

  const getCurrentPageNav = useCallback(() => {
    const userSection = userName ? `/${userName}` : ''
    return `/${scope}${userSection}/${service}${getScreenBlock(screen)}`
  }, [getScreenBlock, scope, screen, service, userName])

  const [width] = useWindowSize()
  const isMobile = useMemo(() => width < MEDIA_QUERY.MOBILE.maxWidth, [width])
  const isPC = useMemo(() => width >= MEDIA_QUERY.PC.minWidth, [width])
  const isFullView = useMemo(
    () => width >= MEDIA_QUERY.FULL_VIEW.minWidth,
    [width],
  )
  const siderWidth = useMemo(() => (open ? 200 : 50), [open])
  const viewPortWidth = useMemo(
    () => (isPC ? width - siderWidth : width) - 16 * 2,
    [isPC, siderWidth, width],
  )

  const [scrollMap, setScrollMap] = useState<Record<string, number>>({})

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
    screenSize: useMemo(
      () => ({
        width,
        isMobile,
        isPC,
        isFullView,
        viewPortWidth,
      }),
      [isFullView, isMobile, isPC, viewPortWidth, width],
    ),
    scrollMap,
    setScrollMap,
  }
}

export const [ScreenProvider, useScreenContext] = constate(useScreen)
