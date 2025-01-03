import React, { useMemo, useState } from 'react'
import { Flex, Typography } from 'antd'
import { type TextProps } from 'antd/es/typography/Text'
import classNames from 'classnames'
import styles from './ManeuverButton.module.css'
import ManeuverPopover from './ManeuverPopover.tsx'
import { getBackImg, getManeuverSrc } from '@/service/Nechronica'
import ManeuverAvatar from '@/service/Nechronica/components/CharacterCard/ManeuverAvatar.tsx'
import { type NechronicaManeuver } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

const FONT_SIZE = 11
const BUTTON_SIZE = 53

const textProps: TextProps = {
  ellipsis: true,
  style: {
    fontSize: FONT_SIZE,
    width: BUTTON_SIZE,
    lineHeight: `${FONT_SIZE}px`,
    whiteSpace: 'nowrap',
  },
}
const avatarStackDivProps: React.HTMLProps<HTMLDivElement> = {
  style: {
    position: 'relative',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    cursor: 'pointer',
  },
}

interface Props {
  maneuver: NechronicaManeuver
  position: number
  mainClass: number
  subClass: number
}
export default function ManeuverButton({
  maneuver,
  position,
  mainClass,
  subClass,
}: Props) {
  const [popoverOpen, setPopoverOpen] = useState(false)

  const stackedAvatar = useMemo(
    () => (
      <div
        {...avatarStackDivProps}
        className={classNames(styles.hoverable, popoverOpen && styles.active)}
      >
        <ManeuverAvatar src={getBackImg(maneuver.type)} />
        <ManeuverAvatar
          src={getManeuverSrc(maneuver, position, mainClass, subClass)}
        />
      </div>
    ),
    [mainClass, maneuver, popoverOpen, position, subClass],
  )

  return useMemo(
    () => (
      <Flex vertical onClick={(e) => e.stopPropagation()}>
        <Typography.Text {...textProps}>{maneuver.name}</Typography.Text>
        <ManeuverPopover maneuver={maneuver} onChangeOpen={setPopoverOpen}>
          {stackedAvatar}
        </ManeuverPopover>
      </Flex>
    ),
    [maneuver, stackedAvatar],
  )
}
