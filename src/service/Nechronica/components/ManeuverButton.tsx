import React from 'react'
import { Flex, Typography } from 'antd'
import { type TextProps } from 'antd/es/typography/Text'
import { getBackImg, getManeuverSrc } from '@/service/Nechronica'
import AvatarNoBorder from '@/service/Nechronica/components/AvatarNoBorder.tsx'
import ManeuverPopover from '@/service/Nechronica/components/ManeuverPopover.tsx'
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

  const ManeuverAvatar = ({ src }: { src: string }) => {
    return (
      <AvatarNoBorder
        src={src}
        size={BUTTON_SIZE}
        style={{ position: 'absolute' }}
      />
    )
  }

  return (
    <Flex vertical onClick={(e) => e.stopPropagation()}>
      <Typography.Text {...textProps}>{maneuver.name}</Typography.Text>
      <ManeuverPopover maneuver={maneuver}>
        {/* stacked avatar */}
        <div {...avatarStackDivProps}>
          <ManeuverAvatar src={getBackImg(maneuver.type)} />
          <ManeuverAvatar
            src={getManeuverSrc(maneuver, position, mainClass, subClass)}
          />
        </div>
      </ManeuverPopover>
    </Flex>
  )
}
