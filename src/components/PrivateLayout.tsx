import { Outlet } from 'react-router-dom'
import Authenticator from '@/Authenticator.tsx'
import { UserAttributesProvider } from '@/context/userAttributes.ts'

export default function PrivateLayout() {
  return (
    <Authenticator>
      <UserAttributesProvider>
        <Outlet />
      </UserAttributesProvider>
    </Authenticator>
  )
}
