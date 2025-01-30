import { type CSSProperties } from 'react'
import { Flex, theme, Typography } from 'antd'

interface Props {
  label: string
  value: string
}
export default function ToolMetaItem({ label, value }: Props) {
  const { token } = theme.useToken()
  const color = token.colorTextDescription

  const baseStyle: CSSProperties = {
    color,
    whiteSpace: 'nowrap',
  }

  return (
    <Flex gap={4} align="baseline" style={{ lineHeight: 0.3 }}>
      <Typography.Text
        style={{
          ...baseStyle,
          fontSize: 10,
          textAlign: 'right',
          width: 38,
          lineHeight: '1.2em',
        }}
      >
        {label}
      </Typography.Text>
      <Typography.Text
        style={{ ...baseStyle, fontSize: 12, lineHeight: '1.2em' }}
      >
        {value}
      </Typography.Text>
    </Flex>
  )
}
