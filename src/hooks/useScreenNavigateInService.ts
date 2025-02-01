import { useCallback, useMemo } from 'react'
import {
  type NavigateOptions,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { parsePathName } from '@/hooks/useScreenLocation.ts'
import { type Screen, type Services } from '@/service'

export default function useScreenNavigateInService(
  screens: Record<string, Screen>,
) {
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

  const { service, scope, screenRaw, urlParam } = parsePathName(
    location.pathname,
  )

  const screen = useMemo(
    () =>
      screenRaw
        ? urlParam
          ? screenRaw.replace(/s$/, '')
          : screenRaw
        : 'index',
    [screenRaw, urlParam],
  )

  const screenIcon = useMemo(() => screens[screen].icon, [screen, screens])
  const screenLabel = useMemo(() => screens[screen].label, [screen, screens])
  const screenContents = useMemo(
    () => screens[screen].contents,
    [screen, screens],
  )

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

      const scopeBlock = props.scope === 'private' ? '/private' : ''

      const urlParamBlock =
        props.screen in screens && screens[props.screen].param && props.urlParam
          ? `/${props.urlParam}`
          : ''

      const screenBlock = (
        urlParamBlock ? `/${props.screen}s` : `/${props.screen}`
      ).replace('/index', '')
      const queryParamBlock = props.queryParam.length
        ? `/?${new URLSearchParams(props.queryParam).toString()}`
        : ''
      return `/${service}${scopeBlock}${screenBlock}${urlParamBlock}${queryParamBlock}`
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
      navigate(getScreenPathName((v) => ({ ...v, service, screen: useScreen })))
    },
    [getScreenPathName, navigate, screen],
  )

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
  }
}
