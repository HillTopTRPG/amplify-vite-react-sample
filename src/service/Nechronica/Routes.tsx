import React from 'react'
import { Outlet, type RouteObject } from 'react-router-dom'
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
  // console.log(path)
  return path
}

const screenRouteObj: RouteObject = {
  path: service.service,
  element: (
    <ScreenProvider {...service}>
      <NechronicaProvider>
        <Outlet />
      </NechronicaProvider>
    </ScreenProvider>
  ),
  children: getKeys(service.screens).map((screen) => ({
    path: getPath(screen),
    element: (
      <MainContentsLayout
        containerStyle={service.screens[screen].containerStyle}
      >
        {React.createElement(service.screens[screen].contents)}
      </MainContentsLayout>
    ),
  })),
}

const routes = {
  public: screenRouteObj,
  private: screenRouteObj,
}

export default routes
