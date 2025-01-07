import { type Dispatch, type SetStateAction, useMemo } from 'react'
import { Avatar, Flex, type FlexProps, List } from 'antd'
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

interface Props {
  maneuverList: NechronicaManeuver[]
  src: string
  parts: number[]
  basic: NechronicaBasic
  isSavantSkill: boolean
  editPopoverOpen: string
  setEditPopoverOpen: Dispatch<SetStateAction<string>>
}

export default function PartsListItem({
  maneuverList,
  src,
  parts,
  basic,
  isSavantSkill,
  editPopoverOpen,
  setEditPopoverOpen,
}: Props) {
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
          editPopoverOpen={editPopoverOpen}
          setEditPopoverOpen={setEditPopoverOpen}
        />
      )),
    [
      filteredManeuver,
      basic.position,
      basic.mainClass,
      basic.subClass,
      editPopoverOpen,
      setEditPopoverOpen,
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

  return isSavantSkill && filteredManeuver.length === 0 ? null : elm
}
