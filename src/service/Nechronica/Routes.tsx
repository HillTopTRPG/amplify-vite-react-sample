import { type RouteObject } from 'react-router-dom'
import { service } from './index'
import { ScreenProvider } from '@/context/screenContext.ts'
import MainContentsLayout from '@/layouts/MainContentsLauout.tsx'
import { NechronicaProvider } from '@/service/Nechronica/context.ts'
import { getKeys } from '@/utils/types.ts'

function getPath(screen: keyof typeof service.screens) {
  const paramBlock = service.screens[screen].param
    ? `s/:${service.screens[screen].param}`
    : ''
  const path = `${screen.replace('index', '')}${paramBlock}`
  console.log(path)
  return path
}

const screenRouteObj: RouteObject = {
  path: service.service,
  element: (
    <ScreenProvider {...service}>
      <NechronicaProvider>
        <MainContentsLayout />
      </NechronicaProvider>
    </ScreenProvider>
  ),
  children: getKeys(service.screens).map((screen) => ({
    path: getPath(screen),
    Component: service.screens[screen].contents,
    handle: { scrollMode: 'pathname' },
  })),
}

const routes = {
  public: screenRouteObj,
  private: screenRouteObj,
}

export default routes
