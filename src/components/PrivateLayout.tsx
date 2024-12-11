import { Outlet } from 'react-router-dom'
import Authenticator from '@/Authenticator.tsx'

export default function PrivateLayout() {
  return <Authenticator el={() => <Outlet />} />
}
