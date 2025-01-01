import { useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import constate from 'constate'
import { MEDIA_QUERY } from '@/const/style.ts'
import { useWindowSize } from '@/hooks/useWindowSize.ts'
import { type Scope, type Screen, type Services } from '@/service'

export type ScreenSize = {
  width: number
  isMobile: boolean
  isPC: boolean
  isFullView: boolean
  viewPortWidth: number
}

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
    return `/${screen}`.replace('/index', '')
  }, [])

  const getScreenPathName = useCallback(
    (props: {
      scope?: Scope
      service?: string
      screen?: string
      userName?: string
      urlParam?: string
      queryParam?: string[][]
    }) => {
      const useUserName = props?.userName ?? userName

      const useQueryParam = props.queryParam ?? []
      if (useUserName) useQueryParam.push(['userName', useUserName])
      const urlParamBlock = props?.urlParam ? `/${props.urlParam}` : ''
      const queryParamBlock = useQueryParam.length
        ? `/?${new URLSearchParams(useQueryParam).toString()}`
        : ''
      return `/${props?.scope ?? scope}/${props?.service ?? service}${getScreenBlock(props?.screen ?? screen)}${urlParamBlock}${queryParamBlock}`
    },
    [getScreenBlock, scope, screen, service, userName],
  )

  const setScreen = useCallback(
    (props: {
      scope?: Scope
      service?: string
      screen?: string
      userName?: string
      urlParam?: string
      queryParam?: string[][]
    }) => {
      navigate(getScreenPathName(props))
    },
    [getScreenPathName, navigate],
  )

  const getScreenUrl = useCallback(
    (props: {
      scope?: Scope
      service?: string
      screen?: string
      userName?: string
      urlParam?: string
      queryParam?: string[][]
    }) => `${baseUrl}${getScreenPathName(props)}`,
    [baseUrl, getScreenPathName],
  )

  const setService = useCallback(
    (services: Services, service: keyof typeof services) => {
      const useScreen = screen in services[service].screens ? screen : 'index'
      navigate(getScreenPathName({ service, screen: useScreen }))
    },
    [getScreenPathName, navigate, screen],
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
      (): ScreenSize => ({
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
