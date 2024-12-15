import { Flex, Typography } from 'antd'
import { getPositionSrc } from '@/service/Nechronica'
import AvatarNoBorder from '@/service/Nechronica/components/AvatarNoBorder.tsx'
import horrorImg from '@/service/Nechronica/images/type/horror.png'
import legionImg from '@/service/Nechronica/images/type/legion.png'
import savantImg from '@/service/Nechronica/images/type/savant.png'
import { type NechronicaType } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

type CharacterAvatarProps = {
  type: NechronicaType
  position: number
}
export default function CharacterAvatar({
  type,
  position,
}: CharacterAvatarProps) {
  const avatarBgColor = 'rgba(255, 255, 0, 0.8)'
  const characterAvatarGradient = `radial-gradient(${avatarBgColor},${avatarBgColor} 60%,transparent 75%)`
  const getSrc = () => {
    if (type === 'savant') return savantImg
    if (type === 'horror') return horrorImg
    if (type === 'legion') return legionImg
    return getPositionSrc(position)
  }
  return (
    <Flex vertical>
      <AvatarNoBorder
        src={getSrc()}
        size={96}
        style={{ background: characterAvatarGradient }}
      />
      <Typography.Text
        ellipsis
        style={{ fontSize: 10, width: 96, textAlign: 'right' }}
      >
        {mapping['CHARACTER_POSITION'][position].text}
      </Typography.Text>
    </Flex>
  )
}
