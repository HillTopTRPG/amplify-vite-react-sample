import { type FC, type ComponentType, type CSSProperties } from 'react'
import higanbina from '@higanbina/index.ts'
import { type ScreenSize } from '@/hooks/useScreenSize.ts'

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
  createdAt: string
  updatedAt: string
}

export type Screen = {
  label: string
  icon: FC
  param?: string
  containerStyle?: (
    screenSize: ScreenSize,
  ) => CSSProperties | false | null | undefined
  hideMenu?: boolean
  contents: ComponentType
}

export type Service = {
  service: string
  serviceName: string
  screens: Record<string, Screen>
}

export type Services = Record<string, Service>

const services: Services = {
  higanbina,
} as const

export default services
