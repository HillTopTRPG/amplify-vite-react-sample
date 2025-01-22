import { useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

export default function useScreenLocation() {
  const location = useLocation()
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

  return {
    userName,
    scope,
    service,
    screen,
    open,
  }
}
