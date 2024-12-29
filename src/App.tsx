import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PrivateLayout from '@/components/PrivateLayout.tsx'
import PublicLayout from '@/components/PublicLayout.tsx'
import Home from '@/pages/Home.tsx'
import NotFound from '@/pages/NotFound.tsx'
import nechronicaRoutes from '@/service/Nechronica/Routes.tsx'

const routes = createBrowserRouter([
  {
    path: '/nechronica',
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
])

export default function App() {
  return <RouterProvider router={routes} />
}
