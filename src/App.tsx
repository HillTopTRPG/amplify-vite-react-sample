import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom'
import PrivateLayout from '@/components/PrivateLayout.tsx'
import PublicLayout from '@/components/PublicLayout.tsx'
import Home from '@/pages/Home.tsx'
import NotFound from '@/pages/NotFound.tsx'
import nechronicaRoutes from '@/service/Nechronica/Routes.tsx'

function Root() {
  return (
    <>
      <ScrollRestoration />
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
        path: '/',
        Component: Home,
      },
      {
        element: <PublicLayout />,
        children: [...nechronicaRoutes.public],
      },
      {
        element: <PrivateLayout />,
        children: [...nechronicaRoutes.private],
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
