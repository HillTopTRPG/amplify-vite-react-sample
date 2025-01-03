import { useMemo } from 'react'
import AvatarNoBorder from '@/service/Nechronica/components/CharacterCard/AvatarNoBorder.tsx'
const BUTTON_SIZE = 53

interface Props {
  src: string
  className?: string
}
export default function ManeuverAvatar({ src, className }: Props) {
  return useMemo(
    () => (
      <AvatarNoBorder
        src={src}
        size={BUTTON_SIZE}
        className={className}
        style={{ position: 'absolute' }}
      />
    ),
    [className, src],
  )
}
