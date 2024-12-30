import { Flex, Typography } from 'antd'
import { getClassSrc } from '@/service/Nechronica'
import AvatarNoBorder from '@/service/Nechronica/components/CharacterCard/AvatarNoBorder.tsx'
import mapping from '@/service/Nechronica/ts/mapping.json'

const AVATAR_SIZE = 60

type ClassAvatarProps = { value: number }
export default function ClassAvatar({ value }: ClassAvatarProps) {
  return (
    <Flex vertical align="center">
      <Typography.Text
        style={{ fontSize: 10 }}
        onClick={(e) => e.stopPropagation()}
      >
        {mapping['CHARACTER_CLASS'][value].text}
      </Typography.Text>
      <AvatarNoBorder
        src={getClassSrc(value)}
        size={AVATAR_SIZE}
        style={{
          display: 'inline-block',
          background: '#efefef22',
          borderRadius: '50%',
          boxShadow:
            '4px 4px 9px 0px rgba(255,255,255,0.45) inset, -4px -4px 9px 0px rgba(0, 0, 0, 0.06) inset',
        }}
      />
    </Flex>
  )
}
