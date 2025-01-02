import { Outlet } from 'react-router-dom'
import Authenticator from '@/Authenticator.tsx'
import { ServicesProvider } from '@/context/servicesContext.ts'
import services from '@/service'

export default function PrivateLayout() {
  return (
    <ServicesProvider services={services}>
      <Authenticator>
        <Outlet />
      </Authenticator>
    </ServicesProvider>
  )
}
