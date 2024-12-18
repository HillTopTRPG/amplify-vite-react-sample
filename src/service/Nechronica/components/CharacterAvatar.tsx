import { Flex, Typography } from 'antd'
import { useThemeContext } from '@/context/theme.ts'
import { getPositionSrc } from '@/service/Nechronica'
import AvatarNoBorder from '@/service/Nechronica/components/AvatarNoBorder.tsx'
import horrorImg from '@/service/Nechronica/images/type/horror.png'
import legionImg from '@/service/Nechronica/images/type/legion.png'
import savantImg from '@/service/Nechronica/images/type/savant.png'
import { type NechronicaType } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

const AVATAR_SIZE = 40

const MAP = {
  savant: { src: () => savantImg, color: ['#815250', '#FFAB91'] },
  horror: { src: () => horrorImg, color: ['#51546f', '#C5CAE9'] },
  legion: { src: () => legionImg, color: ['#4c7975', '#80CBC4'] },
  doll: {
    src: (position: number) => getPositionSrc(position),
    color: ['#606812', '#DCE775'],
  },
} as const

type CharacterAvatarProps = {
  type: NechronicaType
  position: number
  color?: boolean
}
export default function CharacterAvatar({
  type,
  position,
  color,
}: CharacterAvatarProps) {
  const { isDarkMode } = useThemeContext()
  const avatarBgColor = MAP[type].color[isDarkMode ? 0 : 1]
  const characterAvatarGradient = `radial-gradient(${avatarBgColor},${avatarBgColor} 60%,transparent 75%)`

  return (
    <Flex vertical align="center" justify="center">
      <AvatarNoBorder
        src={MAP[type].src(position)}
        size={AVATAR_SIZE}
        style={{ background: color ? characterAvatarGradient : undefined }}
      />
      <Typography.Text style={{ fontSize: 10 }}>
        {mapping['CHARACTER_POSITION'][position].text}
      </Typography.Text>
    </Flex>
  )
}
