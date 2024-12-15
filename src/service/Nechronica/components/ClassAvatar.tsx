import { Flex, Typography } from 'antd'
import { getClassSrc } from '@/service/Nechronica'
import AvatarNoBorder from '@/service/Nechronica/components/AvatarNoBorder.tsx'
import mapping from '@/service/Nechronica/ts/mapping.json'

type ClassAvatarProps = {
  value: number
}
export default function ClassAvatar({ value }: ClassAvatarProps) {
  return (
    <Flex vertical align="center">
      <AvatarNoBorder src={getClassSrc(value)} size={40} />
      <Typography.Text style={{ fontSize: 10 }}>
        {mapping['CHARACTER_CLASS'][value].text}
      </Typography.Text>
    </Flex>
  )
}
