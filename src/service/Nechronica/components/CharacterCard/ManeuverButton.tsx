import {
  type Dispatch,
  type HTMLProps,
  type SetStateAction,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react'
import { Flex, Popover, Typography } from 'antd'
import { type TextProps } from 'antd/es/typography/Text'
import classNames from 'classnames'
import styles from './ManeuverButton.module.css'
import { getBackImg, getManeuverSrc } from '@/service/Nechronica'
import ManeuverAvatar from '@/service/Nechronica/components/CharacterCard/ManeuverAvatar.tsx'
import ManeuverPopoverContents from '@/service/Nechronica/components/CharacterCard/ManeuverPopoverContents.tsx'
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
  editPopoverOpen: string
  setEditPopoverOpen: Dispatch<SetStateAction<string>>
}
export default function ManeuverButton({
  maneuver,
  position,
  mainClass,
  subClass,
  editPopoverOpen,
  setEditPopoverOpen,
}: Props) {
  const maneuverId = useId()
  const [viewPopoverOpen, setViewPopoverOpen] = useState(false)

  const onEditOpenChange = useCallback(
    (open: boolean) => {
      setEditPopoverOpen(open ? maneuverId : '')
    },
    [maneuverId, setEditPopoverOpen],
  )

  const onViewOpenChange = useCallback(
    (open: boolean) => {
      if (open && editPopoverOpen) return
      setViewPopoverOpen(open)
    },
    [editPopoverOpen],
  )

  const stackedAvatar = useMemo(
    () => (
      <div
        {...avatarStackDivProps}
        className={classNames(
          styles.hoverable,
          (editPopoverOpen === maneuverId || viewPopoverOpen) && styles.active,
        )}
      >
        <ManeuverAvatar src={getBackImg(maneuver.type)} />
        <ManeuverAvatar
          src={getManeuverSrc(maneuver, position, mainClass, subClass)}
        />
      </div>
    ),
    [
      editPopoverOpen,
      mainClass,
      maneuver,
      maneuverId,
      position,
      subClass,
      viewPopoverOpen,
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
              onMouseEnter={() => setViewPopoverOpen(false)}
            />
          }
          overlayInnerStyle={{ padding: 0 }}
          trigger="hover"
          open={viewPopoverOpen}
          onOpenChange={onViewOpenChange}
        >
          <Popover
            content={<ManeuverPopoverContents maneuver={maneuver} />}
            overlayInnerStyle={{ padding: 0 }}
            trigger={['click', 'contextMenu']}
            open={editPopoverOpen === maneuverId}
            onOpenChange={onEditOpenChange}
          >
            {stackedAvatar}
          </Popover>
        </Popover>
      </Flex>
    ),
    [
      editPopoverOpen,
      maneuver,
      maneuverId,
      onEditOpenChange,
      onViewOpenChange,
      stackedAvatar,
      viewPopoverOpen,
    ],
  )
}
