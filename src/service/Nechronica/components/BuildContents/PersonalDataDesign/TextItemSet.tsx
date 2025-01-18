import { type CSSProperties, useId } from 'react'
import { Col } from 'antd'
import InputWrap from '@/components/InputWrap.tsx'

const flexCenterStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'inherit',
} as const

interface Props {
  label: string
  thSpan: number
  tdSpan: number
  value: string
  onChange: (value: string) => void
  required?: 'required'
}
export default function TextItemSet({
  label,
  thSpan,
  tdSpan,
  value,
  onChange,
  required,
}: Props) {
  const id = useId()
  return (
    <>
      <Col span={thSpan} style={flexCenterStyle}>
        <label
          htmlFor={id}
          style={{ ...flexCenterStyle, width: '100%', height: '100%' }}
        >
          {label}
        </label>
      </Col>
      <Col span={tdSpan} style={flexCenterStyle}>
        <InputWrap
          id={id}
          value={value}
          addonAfter={required ? '必須' : undefined}
          placeholder={required ? '未入力' : undefined}
          style={{ width: '100%' }}
          required={true}
          onChange={(e) => onChange(e.target.value)}
        />
      </Col>
    </>
  )
}
