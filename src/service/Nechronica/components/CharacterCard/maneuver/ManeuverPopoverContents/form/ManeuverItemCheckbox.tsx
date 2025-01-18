import { type CSSProperties, useId } from 'react'
import { Space, Switch, Typography } from 'antd'

const CONTAINER_STYLE: CSSProperties = {
  alignItems: 'stretch',
  justifyItems: 'center',
  width: '100%',
  fontSize: 12,
  gap: 8,
}

const LABEL_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
}

interface Props {
  label: string
  value: boolean
  onChange: (value: boolean) => void
}
export default function ManeuverItemCheckbox({
  label,
  value,
  onChange,
}: Props) {
  const id = useId()
  return (
    <Space.Compact style={CONTAINER_STYLE}>
      <Switch id={id} value={value} onChange={onChange} />
      <label htmlFor={id} style={LABEL_STYLE}>
        <Typography.Text strong style={{ fontSize: 'inherit' }}>
          {label}
        </Typography.Text>
      </label>
    </Space.Compact>
  )
}
