import { useCallback, useContext, useMemo } from 'react'
import {
  type NavigateOptions,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { servicesContext } from '@/context/servicesContext.ts'
import { type Services } from '@/service'

export default function useScreenNavigateInGlobal() {
  const services = useContext(servicesContext)
  const navigate = useNavigate()
  const location = useLocation()
  const baseQueryParams: [string, string][] = useMemo(
    () => [...new URLSearchParams(location.search).entries()],
    [location.search],
  )
  const [searchParams] = useSearchParams()
  const userName = searchParams.get('userName')

  const [scope, service, screenRaw, urlParam] = location.pathname
    .split('/')
    .slice(1)

  const screens = useMemo(
    () => services[service]?.screens ?? {},
    [service, services],
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
        props.screen in screens && screens[props.screen].param && props.urlParam
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

  const setService = useCallback(
    (services: Services, service: keyof typeof services) => {
      const useScreen = screen in services[service].screens ? screen : 'index'
      navigate(getScreenPathName((v) => ({ ...v, service, screen: useScreen })))
    },
    [getScreenPathName, navigate, screen],
  )

  return {
    scope,
    userName,
    service,
    setService,
    screens,
    screen,
    setScreen,
    screenIcon,
    screenLabel,
  }
}
