import { type ReactElement } from 'react'
import ListManeuverButton from '@Nechronica/components/ManeuverContents/ListManeuverButton.tsx'
import { type ManeuverInfo } from '@Nechronica/context.ts'
import { Empty, Flex, type FlexProps } from 'antd'
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
export default function AllManeuvers({
  maneuvers,
  getCountDetail,
}: Props): ItemType {
  const allManeuvers = maneuvers.map((m) => (
    <ListManeuverButton
      key={`${m.character.id}-${m.maneuverIndex}`}
      maneuverInfo={m}
    />
  ))

  return {
    key: 'all',
    label: `全てのマニューバ(${getCountDetail(allManeuvers)}/${allManeuvers.length})`,
    children: (
      <Flex {...CONTAINER_PROPS}>
        {allManeuvers.length ? (
          allManeuvers
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ margin: 0, alignSelf: 'center' }}
            description="Empty"
          />
        )}
      </Flex>
    ),
  }
}
