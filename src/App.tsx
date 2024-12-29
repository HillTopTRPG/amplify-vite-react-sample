import { useCallback } from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom'
import type { Location, useMatches } from 'react-router-dom'
import PrivateLayout from '@/components/PrivateLayout.tsx'
import PublicLayout from '@/components/PublicLayout.tsx'
import Home from '@/pages/Home.tsx'
import NotFound from '@/pages/NotFound.tsx'
import nechronicaRoutes from '@/service/Nechronica/Routes.tsx'

function Root() {
  const getKey = useCallback(
    (location: Location, matches: ReturnType<typeof useMatches>) => {
      const match = matches.find((m) => (m.handle as any)?.scrollMode)
      if ((match?.handle as any)?.scrollMode === 'pathname') {
        return location.pathname
      }

      return location.key
    },
    [],
  )
  return (
    <>
      <ScrollRestoration getKey={getKey} />
      <Outlet />
    </>
  )
}

const routes = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/public',
        Component: PublicLayout,
        children: [nechronicaRoutes.public],
      },
      {
        path: '/private',
        Component: PrivateLayout,
        children: [nechronicaRoutes.private],
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={routes} />
}
