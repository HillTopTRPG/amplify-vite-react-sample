import { useCallback, useMemo, useState } from 'react'
import {
  type NavigateOptions,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import constate from 'constate'
import { MEDIA_QUERY } from '@/const/style.ts'
import { useWindowSize } from '@/hooks/useWindowSize.ts'
import { type Screen, type Services } from '@/service'

export type ScreenSize = {
  width: number
  isMobile: boolean
  isPC: boolean
  isFullView: boolean
  viewPortWidth: number
}

export const [ScreenProvider, useScreenContext] = constate(
  ({ screens }: { screens: Record<string, Screen> }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const baseUrl = window.location.href.replace(
      `${location.pathname}${location.search}`,
      '',
    )
    const baseQueryParams: [string, string][] = useMemo(
      () => [...new URLSearchParams(location.search).entries()],
      [location.search],
    )
    const [searchParams] = useSearchParams()
    const userName = searchParams.get('userName')

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

    type UrlInfo = {
      scope: string
      screen: string
      urlParam: string | null
      queryParam: [string, string][]
    }
    const getScreenPathName = useCallback(
      (fc: (props: UrlInfo) => UrlInfo) => {
        const props = fc({
          scope,
          screen,
          urlParam,
          queryParam: baseQueryParams,
        })

        const urlParamBlock =
          props.screen in screens &&
          screens[props.screen].param &&
          props.urlParam
            ? `/${props.urlParam}`
            : ''

        const screenBlock = (
          urlParamBlock ? `/${props.screen}s` : `/${props.screen}`
        ).replace('/index', '')
        const queryParamBlock = props.queryParam.length
          ? `/?${new URLSearchParams(props.queryParam).toString()}`
          : ''
        return `/${props.scope}/${service}${screenBlock}${urlParamBlock}${queryParamBlock}`
      },
      [baseQueryParams, scope, screen, screens, service, urlParam],
    )

    const setScreen = useCallback(
      (fc: (props: UrlInfo) => UrlInfo, navigationOption?: NavigateOptions) => {
        navigate(getScreenPathName(fc), navigationOption)
      },
      [getScreenPathName, navigate],
    )

    const getScreenUrl = useCallback(
      (fc: (props: UrlInfo) => UrlInfo) => `${baseUrl}${getScreenPathName(fc)}`,
      [baseUrl, getScreenPathName],
    )

    const setService = useCallback(
      (services: Services, service: keyof typeof services) => {
        const useScreen = screen in services[service].screens ? screen : 'index'
        navigate(
          getScreenPathName((v) => ({ ...v, service, screen: useScreen })),
        )
      },
      [getScreenPathName, navigate, screen],
    )

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
  },
)
