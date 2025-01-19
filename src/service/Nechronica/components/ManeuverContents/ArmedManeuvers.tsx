import { type ReactElement } from 'react'
import ListManeuverButton from '@Nechronica/components/ManeuverContents/ListManeuverButton.tsx'
import { type ManeuverInfo } from '@Nechronica/context.ts'
import { Flex, type FlexProps } from 'antd'
import { type ItemType } from 'rc-collapse/es/interface'

const CONTAINER_PROPS: Omit<FlexProps, 'children'> = {
  align: 'flex-start',
  justify: 'flex-start',
  style: {
    alignContent: 'flex-start',
  },
  wrap: true,
  gap: 11,
} as const

interface Props {
  maneuvers: ManeuverInfo[]
  getCountDetail: (elms: ReactElement[]) => number
}
export default function ArmedManeuvers({
  maneuvers,
  getCountDetail,
}: Props): ItemType {
  const armedManeuvers = maneuvers
    .filter((m) => m.iconClass === 'maneuver-armed')
    .map((m) => (
      <ListManeuverButton
        key={`${m.character.id}-${m.maneuverIndex}`}
        maneuverInfo={m}
      />
    ))

  return {
    key: 'armed',
    label: `武装(${getCountDetail(armedManeuvers)}/${armedManeuvers.length})`,
    children: <Flex {...CONTAINER_PROPS}>{armedManeuvers}</Flex>,
    collapsible: armedManeuvers.length ? undefined : 'disabled',
  }
}
