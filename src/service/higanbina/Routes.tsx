import React from 'react'
import { Outlet, type RouteObject } from 'react-router-dom'
import { tap } from 'lodash-es'
import service from './index'
import AppAuthenticator from '@/AppAuthenticator.tsx'
import FetchGameSystemData from '@/FetchGameSystemData.tsx'
import FetchUserAttributes from '@/FetchUserAttributes.tsx'
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

const children = getKeys(service.screens).map((screen) => ({
  path: getPath(screen),
  element: (
    <FetchUserAttributes>
      <FetchGameSystemData>
        <MainLayout containerStyle={service.screens[screen].containerStyle}>
          {React.createElement(service.screens[screen].contents)}
        </MainLayout>
      </FetchGameSystemData>
    </FetchUserAttributes>
  ),
}))

const routes: RouteObject = {
  path: service.service,
  element: <Outlet />,
  children: [
    {
      children,
    },
    {
      path: 'private',
      element: (
        <AppAuthenticator>
          <Outlet />
        </AppAuthenticator>
      ),
      children,
    },
  ],
}

export default routes
