import { useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

export function parsePathName(pathName: string) {
  const [service, maybeScope, maybeScreenRaw, maybeUrlParam] = pathName
    .split('/')
    .slice(1)
  if (maybeScope === 'private') {
    return {
      service,
      scope: maybeScope,
      screenRaw: maybeScreenRaw,
      urlParam: maybeUrlParam,
    }
  } else {
    return {
      service,
      scope: 'public',
      screenRaw: maybeScope,
      urlParam: maybeScreenRaw,
    }
  }
}

export default function useScreenLocation() {
  const location = useLocation()
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

  return {
    userName,
    scope,
    service,
    screen,
    open,
  }
}
