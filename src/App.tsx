import { useCallback } from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom'
import type { Location } from 'react-router-dom'
import higanbinaRoutes from '@higanbina/Routes.tsx'
import { Provider } from 'react-redux'
import FetchGameSystemData from '@/FetchGameSystemData.tsx'
import FetchUserAttributes from '@/FetchUserAttributes.tsx'
import { servicesContext } from '@/context/servicesContext.ts'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound.tsx'
import Privacy from '@/pages/Privacy'
import Rules from '@/pages/Rules'
import services from '@/service'
import { store } from '@/store'

function Root() {
  const getKey = useCallback((l: Location) => l.pathname, [])

  return (
    <Provider store={store}>
      <FetchUserAttributes>
        <FetchGameSystemData>
          <servicesContext.Provider value={services}>
            <ScrollRestoration getKey={getKey} />
            <Outlet />
          </servicesContext.Provider>
        </FetchGameSystemData>
      </FetchUserAttributes>
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
        path: '/rules',
        Component: Rules,
      },
      {
        path: '/privacy',
        Component: Privacy,
      },
      higanbinaRoutes,
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
