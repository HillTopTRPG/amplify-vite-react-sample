import { Outlet } from 'react-router-dom'
import { ServicesProvider } from '@/context/servicesContext.ts'
import { UserAttributesProvider } from '@/context/userAttributesContext.ts'
import services from '@/service'

export default function PublicLayout() {
  return (
    <ServicesProvider services={services}>
      <UserAttributesProvider>
        <Outlet />
      </UserAttributesProvider>
    </ServicesProvider>
  )
}
