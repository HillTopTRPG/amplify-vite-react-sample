import { type CSSProperties, useId } from 'react'
import { Input, Space, Typography } from 'antd'

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
  value: string
  onChange: (value: string) => void
  multiLine?: true
}
export default function ManeuverTextItemInput({
  label,
  value,
  onChange,
  multiLine,
}: Props) {
  const id = useId()

  const inputProps = {
    id: id,
    value: value,
    onChange: (e: { target: { value: string } }) => onChange(e.target.value),
  } as const

  return (
    <Space.Compact direction="vertical" style={CONTAINER_STYLE}>
      <label htmlFor={id} style={LABEL_STYLE}>
        <Typography.Text strong style={{ fontSize: 'inherit' }}>
          {label}
        </Typography.Text>
      </label>
      {multiLine ? (
        <Input.TextArea
          {...inputProps}
          autoSize={{ minRows: 3 }}
          placeholder="改行可能"
        />
      ) : (
        <Input {...inputProps} />
      )}
    </Space.Compact>
  )
}
