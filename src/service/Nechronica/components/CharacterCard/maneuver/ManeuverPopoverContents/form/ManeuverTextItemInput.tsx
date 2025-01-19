import { type CSSProperties, useId } from 'react'
import { SaveOutlined } from '@ant-design/icons'
import { Button, Input, Space, theme, Typography } from 'antd'
import styles from './ManeuverTextItemInput.module.css'
import InputWrap from '@/components/InputWrap.tsx'
import useOptimistic from '@/hooks/useOptimistic.ts'

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
  const { token } = theme.useToken()
  const [inputValue, setInputValue] = useOptimistic(value)

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
      <Space.Compact>
        {multiLine ? (
          <Input.TextArea
            id={id}
            className={styles.textarea}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoSize={{ minRows: 3 }}
            placeholder="改行可能"
            style={{
              marginRight: -1,
              borderRadius: `${token.borderRadius}px 0 0 ${token.borderRadius}px`,
            }}
          />
        ) : (
          <InputWrap
            id={id}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={onSave}
            style={{
              borderRadius: `${token.borderRadius}px 0 0 ${token.borderRadius}px`,
            }}
          />
        )}
        <Button
          icon={<SaveOutlined />}
          className={styles.save}
          onClick={onSave}
          type={inputValue === value ? 'default' : 'primary'}
          style={{
            color:
              inputValue === value ? token.colorTextPlaceholder : undefined,
          }}
        />
      </Space.Compact>
    </Space.Compact>
  )
}
