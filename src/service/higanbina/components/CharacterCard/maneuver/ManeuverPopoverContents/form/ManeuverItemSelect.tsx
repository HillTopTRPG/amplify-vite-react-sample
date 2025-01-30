import { type CSSProperties, useId } from 'react'
import { Select, type SelectProps, Space, Typography } from 'antd'

const CONTAINER_STYLE: CSSProperties = {
  alignItems: 'stretch',
  justifyItems: 'center',
  width: '100%',
  fontSize: 12,
}

const LABEL_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
}

interface Props {
  label: string
  value: number
  onChange: (value: number) => void
  options: SelectProps['options']
}
export default function ManeuverItemSelect({
  label,
  value,
  onChange,
  options,
}: Props) {
  const id = useId()
  return (
    <Space.Compact direction="vertical" style={CONTAINER_STYLE}>
      <label htmlFor={id} style={LABEL_STYLE}>
        <Typography.Text strong style={{ fontSize: 'inherit' }}>
          {label}
        </Typography.Text>
      </label>
      <Select
        id={id}
        showSearch
        value={value}
        onChange={onChange}
        optionFilterProp="label"
        options={options}
      />
    </Space.Compact>
  )
}
