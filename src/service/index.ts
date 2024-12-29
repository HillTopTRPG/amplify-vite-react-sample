import { type ReactNode, type FC } from 'react'
import nechronica from './Nechronica/index.ts'

export type CharacterGroupAdditionalData = {
  stared: boolean
}

export type CharacterGroup = {
  id: string
  system: string
  name: string
  additionalData: CharacterGroupAdditionalData
  characterIds: string[]
  owner: string
  public: boolean
  createdAt: Date
  updatedAt: Date
}

export type Screen = {
  label: string
  authorize: boolean
  icon: FC
  param?: string
  contents: () => ReactNode
}

export type Service = {
  service: string
  serviceName: string
  screens: Record<string, Screen>
}
export type Services = Record<string, Service>

const services: Services = {
  nechronica,
} as const

export default services
