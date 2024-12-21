import React, { type RefObject } from 'react'
import { Input, type InputRef, Space, theme } from 'antd'
import KeyText from '@/service/Nechronica/components/KeyText.tsx'

type BorderlessInputProps = {
  value: string
  isAffixed: boolean
  onChange: (value: string) => void
  placeholder: string
  width: number
  icon: React.ReactNode
  shortcutKey?: string
  inputRef: RefObject<InputRef>
}
export default function BorderlessInput({
  value,
  isAffixed,
  onChange,
  placeholder,
  width,
  icon,
  shortcutKey,
  inputRef,
}: BorderlessInputProps) {
  const { token } = theme.useToken()
  return (
    <Input
      value={value}
      variant="borderless"
      size={isAffixed ? 'middle' : 'large'}
      suffix={
        <Space size={3}>
          {icon}
          {shortcutKey ? (
            <Space size={3} style={{ marginRight: 5 }}>
              <KeyText value="⌘" />
              <KeyText value={shortcutKey} />
            </Space>
          ) : null}
        </Space>
      }
      onChange={(value) => onChange(value.target.value)}
      allowClear
      placeholder={placeholder}
      style={{
        width,
        pointerEvents: 'all',
        backgroundColor: token.colorBgContainer,
        boxShadow: isAffixed
          ? '7px 7px 20px -1px rgba(85, 85, 85, 0.3)'
          : undefined,
      }}
      ref={inputRef}
    />
  )
}
