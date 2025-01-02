import { Outlet } from 'react-router-dom'
import { ServicesProvider } from '@/context/servicesContext.ts'
import services from '@/service'

export default function PublicLayout() {
  return (
    <ServicesProvider services={services}>
      <Outlet />
    </ServicesProvider>
  )
}
