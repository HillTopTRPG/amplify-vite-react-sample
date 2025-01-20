import { createContext } from 'react'
import services from '@/service'

export const servicesContext = createContext<typeof services>(services)
