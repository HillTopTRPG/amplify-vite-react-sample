import { getCharacterTypeSrc } from '@higanbina/index.ts'
import { type NechronicaType } from '@higanbina/ts/NechronicaDataHelper.ts'
import mapping from '@higanbina/ts/mapping.json'
import { Avatar, Flex, Typography } from 'antd'
import { useAppSelector } from '@/store'
import { selectTheme } from '@/store/themeSlice.ts'

const AVATAR_SIZE = 80

const MAP = {
  savant: {
    src: () => getCharacterTypeSrc('savant', 0),
    color: ['#815250', '#FFAB91'],
  },
  horror: {
    src: () => getCharacterTypeSrc('horror', 0),
    color: ['#51546f', '#C5CAE9'],
  },
  legion: {
    src: () => getCharacterTypeSrc('legion', 0),
    color: ['#4c7975', '#80CBC4'],
  },
  doll: {
    src: (position: number) => getCharacterTypeSrc('doll', position),
    color: ['#606812', '#DCE775'],
  },
} as const

interface Props {
  type: NechronicaType
  position: number
  color?: boolean
}
export default function CharacterAvatar({ type, position, color }: Props) {
  const themeType = useAppSelector(selectTheme)
  const avatarBgColor = MAP[type].color[themeType === 'dark' ? 0 : 1]
  const characterAvatarGradient = `radial-gradient(${avatarBgColor},${avatarBgColor} 60%,transparent 75%)`

  return (
    <Flex vertical align="center" justify="center">
      <Typography.Text style={{ fontSize: 10 }}>
        {mapping['CHARACTER_POSITION'][position].text}
      </Typography.Text>
      <Avatar
        src={MAP[type].src(position)}
        size={AVATAR_SIZE}
        draggable={false}
        shape="circle"
        style={{
          border: 'none',
          userSelect: 'none',
          background: color ? characterAvatarGradient : '#efefef22',
          borderRadius: '50%',
          boxShadow: color
            ? undefined
            : '4px 4px 9px 0px rgba(255,255,255,0.45) inset, -4px -4px 9px 0px rgba(0, 0, 0, 0.06) inset',
        }}
      />
    </Flex>
  )
}
