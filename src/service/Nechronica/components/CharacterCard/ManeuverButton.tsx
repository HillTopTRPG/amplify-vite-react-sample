import { type HTMLProps, useCallback, useId, useMemo } from 'react'
import { Flex, Popover, Typography } from 'antd'
import { type TextProps } from 'antd/es/typography/Text'
import classNames from 'classnames'
import styles from './ManeuverButton.module.css'
import { getBackImg, getManeuverSrc } from '@/service/Nechronica'
import ManeuverAvatar from '@/service/Nechronica/components/CharacterCard/ManeuverAvatar.tsx'
import ManeuverPopoverContents from '@/service/Nechronica/components/CharacterCard/ManeuverPopoverContents.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
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
const avatarStackDivProps: HTMLProps<HTMLDivElement> = {
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
  const maneuverId = useId()
  const {
    viewPopoverManeuver,
    setViewPopoverManeuver,
    editPopoverManeuver,
    setEditPopoverManeuver,
  } = useNechronicaContext()

  const onEditOpenChange = useCallback(
    (open: boolean) => {
      setEditPopoverManeuver(open ? maneuverId : '')
    },
    [maneuverId, setEditPopoverManeuver],
  )

  const onViewOpenChange = useCallback(
    (open: boolean) => {
      if (open && editPopoverManeuver) return
      setViewPopoverManeuver(open ? maneuverId : '')
    },
    [editPopoverManeuver, maneuverId, setViewPopoverManeuver],
  )

  const stackedAvatar = useMemo(
    () => (
      <div
        {...avatarStackDivProps}
        className={classNames(
          styles.hoverable,
          [editPopoverManeuver, viewPopoverManeuver].includes(maneuverId) &&
            styles.active,
        )}
      >
        <ManeuverAvatar src={getBackImg(maneuver.type)} />
        <ManeuverAvatar
          src={getManeuverSrc(maneuver, position, mainClass, subClass)}
        />
      </div>
    ),
    [
      editPopoverManeuver,
      mainClass,
      maneuver,
      maneuverId,
      position,
      subClass,
      viewPopoverManeuver,
    ],
  )

  return useMemo(
    () => (
      <Flex vertical onClick={(e) => e.stopPropagation()}>
        <Typography.Text {...textProps}>{maneuver.name}</Typography.Text>

        <Popover
          content={
            <ManeuverPopoverContents
              maneuver={maneuver}
              onMouseEnter={() => setViewPopoverManeuver('')}
            />
          }
          overlayInnerStyle={{ padding: 0 }}
          trigger="hover"
          open={viewPopoverManeuver === maneuverId}
          onOpenChange={onViewOpenChange}
        >
          <Popover
            content={<ManeuverPopoverContents maneuver={maneuver} />}
            overlayInnerStyle={{ padding: 0 }}
            trigger={['click', 'contextMenu']}
            open={editPopoverManeuver === maneuverId}
            onOpenChange={onEditOpenChange}
          >
            {stackedAvatar}
          </Popover>
        </Popover>
      </Flex>
    ),
    [
      editPopoverManeuver,
      maneuver,
      maneuverId,
      onEditOpenChange,
      onViewOpenChange,
      setViewPopoverManeuver,
      stackedAvatar,
      viewPopoverManeuver,
    ],
  )
}
