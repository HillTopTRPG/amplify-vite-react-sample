import { useCallback } from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom'
import type { Location } from 'react-router-dom'
import nechronicaRoutes from '@Nechronica/Routes.tsx'
import { Provider } from 'react-redux'
import Authenticator from '@/Authenticator.tsx'
import { serviceContext } from '@/context/servicesContext.ts'
import Home from '@/pages/Home.tsx'
import NotFound from '@/pages/NotFound.tsx'
import services from '@/service'
import { store } from '@/store'

function Root() {
  const getKey = useCallback((l: Location) => l.pathname, [])
  return (
    <Provider store={store}>
      <serviceContext.Provider value={services}>
        <ScrollRestoration getKey={getKey} />
        <Outlet />
      </serviceContext.Provider>
    </Provider>
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
