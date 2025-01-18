import { type CSSProperties, useEffect, useId, useState } from 'react'
import { SaveOutlined } from '@ant-design/icons'
import { Button, Input, Space, Typography } from 'antd'
import InputWrap from '@/components/InputWrap.tsx'

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
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const onSave = () => {
    if (inputValue === value) return
    onChange(inputValue)
  }

  return (
    <Space.Compact direction="vertical" style={CONTAINER_STYLE}>
      <label htmlFor={id} style={LABEL_STYLE}>
        <Typography.Text strong style={{ fontSize: 'inherit' }}>
          {label}
        </Typography.Text>
      </label>
      {multiLine ? (
        <Input.TextArea
          id={id}
          value={value}
          autoSize={{ minRows: 3 }}
          placeholder="改行可能"
        />
      ) : (
        <Space.Compact>
          <InputWrap
            id={id}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={onSave}
          />
          <Button icon={<SaveOutlined />} onClick={onSave} />
        </Space.Compact>
      )}
    </Space.Compact>
  )
}
