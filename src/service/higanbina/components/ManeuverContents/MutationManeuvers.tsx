import { type ReactElement } from 'react'
import ListManeuverButton from '@higanbina/components/ManeuverContents/ListManeuverButton.tsx'
import { Flex, type FlexProps } from 'antd'
import { type ItemType } from 'rc-collapse/es/interface'
import { type ManeuverInfo } from '@/store/nechronicaSlice.ts'

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
export default function MutationManeuvers({
  maneuvers,
  getCountDetail,
}: Props): ItemType {
  const mutationManeuvers = maneuvers
    .filter((m) => m.iconClass === 'maneuver-mutation')
    .map((m) => (
      <ListManeuverButton
        key={`${m.character.id}-${m.maneuverIndex}`}
        maneuverInfo={m}
      />
    ))

  return {
    key: 'mutation',
    label: `変異(${getCountDetail(mutationManeuvers)}/${mutationManeuvers.length})`,
    children: <Flex {...CONTAINER_PROPS}>{mutationManeuvers}</Flex>,
    collapsible: mutationManeuvers.length ? undefined : 'disabled',
  }
}
