import { type ReactNode, useMemo } from 'react'
import ManeuverButton from '@higanbina/components/CharacterCard/maneuver/ManeuverButton.tsx'
import unknownImg from '@higanbina/images/unknown.png'
import {
  type NechronicaBasic,
  type NechronicaManeuver,
} from '@higanbina/ts/NechronicaDataHelper.ts'
import { Avatar, Flex, type FlexProps, List } from 'antd'

const containerFlexProps: Omit<FlexProps, 'children'> = {
  align: 'center',
  justify: 'flex-start',
  gap: 4,
  wrap: true,
  style: { flexGrow: 1 },
}

interface Props {
  maneuverList: NechronicaManeuver[]
  hoverContent?: (maneuver: NechronicaManeuver, index: number) => ReactNode
  clickContent?: (maneuver: NechronicaManeuver, index: number) => ReactNode
  src: string
  parts: number[]
  basic: NechronicaBasic
  isSavantSkill: boolean
}
export default function PartsListItem({
  maneuverList,
  hoverContent,
  clickContent,
  src,
  parts,
  basic,
  isSavantSkill,
}: Props) {
  const filteredManeuvers = useMemo(
    () =>
      maneuverList
        .map((maneuver, index) => ({ maneuver, index }))
        .filter((info) => parts.includes(info.maneuver.parts)),
    [maneuverList, parts],
  )

  const maneuverButtons = useMemo(
    () =>
      filteredManeuvers.map((info, index) => (
        <ManeuverButton
          key={index}
          maneuver={info.maneuver}
          hoverContent={hoverContent?.call(null, info.maneuver, info.index)}
          clickContent={clickContent?.call(null, info.maneuver, info.index)}
          position={basic.position}
          mainClass={basic.mainClass}
          subClass={basic.subClass}
        />
      )),
    [
      filteredManeuvers,
      hoverContent,
      clickContent,
      basic.position,
      basic.mainClass,
      basic.subClass,
    ],
  )

  const elm = useMemo(
    () => (
      <List.Item style={{ padding: '6px 0' }}>
        <Flex align="flex-start" justify="flex-start" gap={7}>
          <Avatar
            src={isSavantSkill ? unknownImg : src}
            size={64}
            draggable={false}
            shape="square"
            style={{
              border: 'none',
              userSelect: 'none',
              minWidth: 64,
            }}
          />
          <Flex {...containerFlexProps}>{maneuverButtons}</Flex>
        </Flex>
      </List.Item>
    ),
    [isSavantSkill, maneuverButtons, src],
  )

  return isSavantSkill && filteredManeuvers.length === 0 ? null : elm
}
