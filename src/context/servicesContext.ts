import { createContext } from 'react'
import services from '@/service'

export const serviceContext = createContext<typeof services>(services)
