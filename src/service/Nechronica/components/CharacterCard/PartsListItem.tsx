import { useMemo } from 'react'
import { Flex, type FlexProps, List } from 'antd'
import AvatarNoBorder from './AvatarNoBorder.tsx'
import ManeuverButton from './ManeuverButton.tsx'
import unknownImg from '@/service/Nechronica/images/unknown.png'
import {
  type NechronicaBasic,
  type NechronicaManeuver,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

const containerFlexProps: Omit<FlexProps, 'children'> = {
  align: 'center',
  justify: 'flex-start',
  gap: 4,
  wrap: true,
  style: { flexGrow: 1 },
}

export default function PartsListItem({
  maneuverList,
  src,
  parts,
  basic,
  isSavantSkill,
}: {
  maneuverList: NechronicaManeuver[]
  src: string
  parts: number[]
  basic: NechronicaBasic
  isSavantSkill: boolean
}) {
  const filteredManeuver = useMemo(
    () => maneuverList.filter((maneuver) => parts.includes(maneuver.parts)),
    [maneuverList, parts],
  )

  const maneuverButtons = useMemo(
    () =>
      filteredManeuver.map((maneuver, index) => (
        <ManeuverButton
          key={index}
          maneuver={maneuver}
          position={basic.position}
          mainClass={basic.mainClass}
          subClass={basic.subClass}
        />
      )),
    [basic.position, basic.mainClass, basic.subClass, filteredManeuver],
  )

  return isSavantSkill && filteredManeuver.length === 0 ? null : (
    <List.Item style={{ padding: '6px 0' }}>
      <Flex align="flex-start" justify="flex-start" gap={7}>
        <AvatarNoBorder
          src={isSavantSkill ? unknownImg : src}
          size={64}
          style={{ minWidth: 64 }}
        />
        <Flex {...containerFlexProps}>{maneuverButtons}</Flex>
      </Flex>
    </List.Item>
  )
}
