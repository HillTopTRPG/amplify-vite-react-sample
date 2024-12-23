import nechronica from './Nechronica/index.ts'
import nechronica2 from './Nechronica2/index.ts'

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
  icon: React.FC
  contents: () => React.ReactNode
}

export type Service = {
  service: string
  serviceName: string
  screens: Record<string, Screen>
}
export type Services = Record<string, Service>

const services: Services = {
  nechronica,
  nechronica2,
} as const

export default services
