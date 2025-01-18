import {
  type HTMLProps,
  type ReactNode,
  useCallback,
  useId,
  useMemo,
} from 'react'
import { Flex, Popover, Typography } from 'antd'
import { type TextProps } from 'antd/es/typography/Text'
import classNames from 'classnames'
import ManeuverAvatar from './ManeuverAvatar.tsx'
import styles from './ManeuverButton.module.css'
import { getBackImg, getManeuverSrc } from '@/service/Nechronica'
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
  hoverContent?: ReactNode
  clickContent?: ReactNode
  position: number
  mainClass: number
  subClass: number
  selected?: boolean
  onClick?: () => void
}
export default function ManeuverButton({
  maneuver,
  hoverContent,
  clickContent,
  position,
  mainClass,
  subClass,
  selected,
  onClick,
}: Props) {
  const maneuverId = useId()
  const {
    hoverManeuverId,
    setHoverManeuverId,
    clickManeuverId,
    setClickManeuverId,
  } = useNechronicaContext()

  const onEditOpenChange = useCallback(
    (open: boolean) => {
      setClickManeuverId(open ? maneuverId : '')
    },
    [maneuverId, setClickManeuverId],
  )

  const onViewOpenChange = useCallback(
    (open: boolean) => {
      if (open && clickManeuverId) return
      setHoverManeuverId(open ? maneuverId : '')
    },
    [clickManeuverId, maneuverId, setHoverManeuverId],
  )

  const isActive = useMemo(
    () => [hoverManeuverId, clickManeuverId].includes(maneuverId) || selected,
    [clickManeuverId, hoverManeuverId, maneuverId, selected],
  )

  const stackedAvatar = useMemo(
    () => (
      <div
        {...avatarStackDivProps}
        onClick={onClick}
        className={classNames(styles.hoverable, isActive && styles.active)}
      >
        <ManeuverAvatar src={getBackImg(maneuver)} />
        <ManeuverAvatar
          src={getManeuverSrc(maneuver, position, mainClass, subClass)}
        />
      </div>
    ),
    [isActive, mainClass, maneuver, onClick, position, subClass],
  )

  return useMemo(
    () => (
      <Flex vertical onClick={(e) => e.stopPropagation()}>
        <Typography.Text {...textProps}>{maneuver.name}</Typography.Text>

        <Popover
          content={hoverContent}
          overlayInnerStyle={{ padding: 0 }}
          mouseEnterDelay={0.05}
          trigger={hoverContent ? 'hover' : []}
          open={hoverManeuverId === maneuverId}
          onOpenChange={onViewOpenChange}
        >
          <Popover
            content={clickContent}
            overlayInnerStyle={{ padding: 0 }}
            mouseEnterDelay={0.05}
            trigger={onClick || !clickContent ? [] : ['click', 'contextMenu']}
            open={clickManeuverId === maneuverId}
            onOpenChange={onEditOpenChange}
          >
            {stackedAvatar}
          </Popover>
        </Popover>
      </Flex>
    ),
    [
      clickContent,
      clickManeuverId,
      hoverContent,
      hoverManeuverId,
      maneuver.name,
      maneuverId,
      onClick,
      onEditOpenChange,
      onViewOpenChange,
      stackedAvatar,
    ],
  )
}
