import { useMemo } from 'react'
import { Flex, type FlexProps, List } from 'antd'
import AvatarNoBorder from '@/service/Nechronica/components/AvatarNoBorder.tsx'
import ManeuverButton from '@/service/Nechronica/components/ManeuverButton.tsx'
import {
  type NechronicaBasic,
  type NechronicaManeuver,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

const containerFlexProps: Omit<FlexProps, 'children'> = {
  align: 'center',
  justify: 'flex-start',
  gap: 7,
  wrap: true,
  style: { flexGrow: 1 },
}

export default function PartsListItem({
  maneuverList,
  src,
  parts,
  basic,
}: {
  maneuverList: NechronicaManeuver[]
  src: string
  parts: number[]
  basic: NechronicaBasic
}) {
  const filteredManeuver = useMemo(
    () => maneuverList.filter((maneuver) => parts.includes(maneuver.parts)),
    [maneuverList, parts],
  )

  const { position, mainClass, subClass } = basic

  const maneuverButtons = useMemo(
    () =>
      filteredManeuver.map((maneuver, index) => (
        <ManeuverButton
          key={index}
          maneuver={maneuver}
          position={position}
          mainClass={mainClass}
          subClass={subClass}
        />
      )),
    [position, mainClass, subClass, filteredManeuver],
  )

  return (
    <List.Item style={{ padding: '6px 0' }}>
      <Flex align="flex-start" justify="flex-start" gap={7}>
        <AvatarNoBorder src={src} size={64} style={{ minWidth: 64 }} />
        <Flex {...containerFlexProps}>{maneuverButtons}</Flex>
      </Flex>
    </List.Item>
  )
}
