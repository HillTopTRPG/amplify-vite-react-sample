import { useState } from 'react'
import { TagOutlined } from '@ant-design/icons'
import { Tag, type TagProps, Typography } from 'antd'

export default function CopyableTag({ text }: { text: string }) {
  const [hover, setHover] = useState(false)

  const tagProps: TagProps = {
    icon: <TagOutlined />,
    onClick: (e) => e.stopPropagation(),
  }

  return (
    <Tag
      {...tagProps}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Typography.Text copyable={hover}>{text}</Typography.Text>
    </Tag>
  )
}
