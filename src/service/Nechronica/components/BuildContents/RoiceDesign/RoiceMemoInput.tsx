import { useId } from 'react'
import { ConfigProvider, Input, Space, theme, Typography } from 'antd'

interface Props {
  value: string
  onChange: (value: string) => void
}
export default function RoiceMemoInput({ value, onChange }: Props) {
  const { token } = theme.useToken()
  const id = useId()
  return (
    <Space.Compact
      style={{ alignItems: 'stretch', justifyItems: 'center', width: '100%' }}
    >
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
          備考
        </Typography.Text>
      </label>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              colorBorder: token.colorBorderBg,
            },
          },
        }}
      >
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '100%' }}
        />
      </ConfigProvider>
    </Space.Compact>
  )
}
