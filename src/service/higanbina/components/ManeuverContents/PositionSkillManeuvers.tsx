import { type ReactElement } from 'react'
import ListManeuverButton from '@higanbina/components/ManeuverContents/ListManeuverButton.tsx'
import mapping from '@higanbina/ts/mapping.json'
import { Flex, type FlexProps } from 'antd'
import { type ItemType } from 'rc-collapse/es/interface'
import { getIconClass } from '@/service/higanbina'
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

const getPosition = (info: ManeuverInfo) => {
  const { position, mainClass, subClass } = info.character.sheetData.basic
  const iconClass = getIconClass(info.maneuver, position, mainClass, subClass)
  return mapping.CHARACTER_POSITION.findIndex((p) => p.val === iconClass)
}

interface Props {
  maneuvers: ManeuverInfo[]
  getCountDetail: (elms: ReactElement[]) => number
}
export default function PositionSkillManeuvers({
  maneuvers,
  getCountDetail,
}: Props): ItemType {
  const positionManeuvers = maneuvers
    .filter((m) => m.iconClass.startsWith('position-'))
    .sort((a, b) => getPosition(a) - getPosition(b))
    .map((m) => (
      <ListManeuverButton
        key={`${m.character.id}-${m.maneuverIndex}`}
        maneuverInfo={m}
      />
    ))

  return {
    key: 'positionSkill',
    label: `ポジションスキル(${getCountDetail(positionManeuvers)}/${positionManeuvers.length})`,
    children: <Flex {...CONTAINER_PROPS}>{positionManeuvers}</Flex>,
    collapsible: positionManeuvers.length ? undefined : 'disabled',
  }
}
