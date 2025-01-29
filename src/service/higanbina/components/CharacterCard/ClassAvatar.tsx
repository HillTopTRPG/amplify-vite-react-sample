import { getClassSrc } from '@higanbina/index.ts'
import mapping from '@higanbina/ts/mapping.json'
import { Avatar, Flex, Typography } from 'antd'

const AVATAR_SIZE = 60

interface Props {
  value: number
}
export default function ClassAvatar({ value }: Props) {
  return (
    <Flex vertical align="center">
      <Typography.Text
        ellipsis
        style={{ fontSize: 10 }}
        onClick={(e) => e.stopPropagation()}
      >
        {mapping['CHARACTER_CLASS'][value].text}
      </Typography.Text>
      <Avatar
        src={getClassSrc(value)}
        size={AVATAR_SIZE}
        draggable={false}
        shape="circle"
        style={{
          border: 'none',
          userSelect: 'none',
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
