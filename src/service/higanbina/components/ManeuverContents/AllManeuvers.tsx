import { type ReactElement } from 'react'
import ListManeuverButton from '@higanbina/components/ManeuverContents/ListManeuverButton.tsx'
import { Empty, Flex, type FlexProps, Spin } from 'antd'
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
  loading: boolean
  maneuvers: ManeuverInfo[]
  getCountDetail: (elms: ReactElement[]) => number
}
export default function AllManeuvers({
  loading,
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
        {loading ? (
          <Spin />
        ) : allManeuvers.length ? (
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
