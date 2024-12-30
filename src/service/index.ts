import { type FC, type ComponentType } from 'react'
import { service as nechronica } from './Nechronica/index.ts'

export type Scope = 'private' | 'public'

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
  icon: FC
  param?: string
  contents: ComponentType
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
