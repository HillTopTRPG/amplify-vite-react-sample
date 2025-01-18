import { useMemo } from 'react'
import { Avatar } from 'antd'
const BUTTON_SIZE = 53

interface Props {
  src: string
  className?: string
}
export default function ManeuverAvatar({ src, className }: Props) {
  return useMemo(
    () => (
      <Avatar
        src={src}
        size={BUTTON_SIZE}
        draggable={false}
        shape="square"
        className={className}
        style={{
          border: 'none',
          userSelect: 'none',
          position: 'absolute',
        }}
      />
    ),
    [className, src],
  )
}
