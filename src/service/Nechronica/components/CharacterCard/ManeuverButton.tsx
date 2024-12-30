import React, { useState } from 'react'
import { Flex, Typography } from 'antd'
import { type TextProps } from 'antd/es/typography/Text'
import classNames from 'classnames'
import AvatarNoBorder from './AvatarNoBorder.tsx'
import styles from './ManeuverButton.module.css'
import ManeuverPopover from './ManeuverPopover.tsx'
import { getBackImg, getManeuverSrc } from '@/service/Nechronica'
import { type NechronicaManeuver } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

const FONT_SIZE = 11
const BUTTON_SIZE = 53

type ManeuverButtonProps = {
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
}: ManeuverButtonProps) {
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

  const ManeuverAvatar = ({
    src,
    className,
  }: {
    src: string
    className?: string
  }) => {
    return (
      <AvatarNoBorder
        src={src}
        size={BUTTON_SIZE}
        className={className}
        style={{ position: 'absolute' }}
      />
    )
  }

  const [popoverOpen, setPopoverOpen] = useState(false)

  return (
    <Flex vertical onClick={(e) => e.stopPropagation()}>
      <Typography.Text {...textProps}>{maneuver.name}</Typography.Text>
      <ManeuverPopover maneuver={maneuver} onChangeOpen={setPopoverOpen}>
        {/* stacked avatar */}
        <div
          {...avatarStackDivProps}
          className={classNames(styles.hoverable, popoverOpen && styles.active)}
        >
          <ManeuverAvatar src={getBackImg(maneuver.type)} />
          <ManeuverAvatar
            src={getManeuverSrc(maneuver, position, mainClass, subClass)}
          />
        </div>
      </ManeuverPopover>
    </Flex>
  )
}
