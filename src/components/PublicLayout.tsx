import { Outlet } from 'react-router-dom'
import { UserAttributesProvider } from '@/context/userAttributes.ts'

export default function PublicLayout() {
  return (
    <UserAttributesProvider>
      <Outlet />
    </UserAttributesProvider>
  )
}
