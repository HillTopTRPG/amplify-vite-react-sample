import { useId } from 'react'
import { Flex, Input, Space, theme, Typography } from 'antd'

interface Props {
  value: string
  onChange: (value: string) => void
}
export default function RoiceTargetInput({ value, onChange }: Props) {
  const { token } = theme.useToken()
  const id = useId()
  return (
    <Flex align="center">
      <Space.Compact style={{ alignItems: 'stretch', justifyItems: 'center' }}>
        <label
          htmlFor={id}
          style={{
            whiteSpace: 'nowrap',
            borderStyle: 'solid',
            borderWidth: '1px 0 1px 1px',
            borderColor: token.colorBorderBg,
            borderRadius: `${token.borderRadius}px 0 0 ${token.borderRadius}px`,
            paddingLeft: 11,
            paddingRight: 11,
            display: 'flex',
            alignItems: 'center',
            justifyItems: 'center',
          }}
        >
          <Typography.Text strong style={{ fontSize: 'inherit' }}>
            対象
          </Typography.Text>
        </label>
        <Input
          id={id}
          value={value}
          suffix="への"
          onChange={(e) => onChange(e.target.value)}
        />
      </Space.Compact>
    </Flex>
  )
}
