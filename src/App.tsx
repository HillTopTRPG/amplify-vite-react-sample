import { useCallback } from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom'
import type { Location } from 'react-router-dom'
import Authenticator from '@/Authenticator.tsx'
import { ServicesProvider } from '@/context/servicesContext.ts'
import Home from '@/pages/Home.tsx'
import NotFound from '@/pages/NotFound.tsx'
import services from '@/service'
import nechronicaRoutes from '@/service/Nechronica/Routes.tsx'

function Root() {
  const getKey = useCallback((l: Location) => l.pathname, [])
  return (
    <ServicesProvider services={services}>
      <ScrollRestoration getKey={getKey} />
      <Outlet />
    </ServicesProvider>
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
        children: [nechronicaRoutes.public],
      },
      {
        path: '/private',
        element: (
          <Authenticator>
            <Outlet />
          </Authenticator>
        ),
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
