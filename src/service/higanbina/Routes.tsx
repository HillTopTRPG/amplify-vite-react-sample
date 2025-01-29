import React from 'react'
import { Outlet, type RouteObject } from 'react-router-dom'
import { tap } from 'lodash-es'
import service from './index'
import MainLayout from '@/layouts/MainLayout'
import { getKeys } from '@/utils/types.ts'

function getPath(screen: keyof typeof service.screens) {
  const paramBlock = service.screens[screen].param
    ? `s/:${service.screens[screen].param}`
    : ''
  return tap(
    `${screen.replace('index', '')}${paramBlock}`,
    // console.log,
    () => {},
  )
}

const screenRouteObj: RouteObject = {
  path: service.service,
  element: <Outlet />,
  children: getKeys(service.screens).map((screen) => ({
    path: getPath(screen),
    element: (
      <MainLayout containerStyle={service.screens[screen].containerStyle}>
        {React.createElement(service.screens[screen].contents)}
      </MainLayout>
    ),
  })),
}

const routes = {
  public: screenRouteObj,
  private: screenRouteObj,
}

export default routes
