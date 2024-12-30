import constate from 'constate'
import { type Services } from '@/service'

const useServices = ({ services }: { services: Services }) => {
  return { services }
}

export const [ServicesProvider, useServicesContext] = constate(useServices)
