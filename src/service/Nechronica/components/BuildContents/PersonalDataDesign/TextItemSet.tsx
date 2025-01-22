import { type CSSProperties, useId } from 'react'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { Col } from 'antd'
import InputWrap from '@/components/InputWrap.tsx'
import { useAppDispatch } from '@/store'

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
  actionCreatorWithPayload: ActionCreatorWithPayload<string, string>
  required?: 'required'
}
export default function TextItemSet({
  label,
  thSpan,
  tdSpan,
  value,
  actionCreatorWithPayload,
  required,
}: Props) {
  const id = useId()
  const dispatch = useAppDispatch()
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
          onChange={(e) => dispatch(actionCreatorWithPayload(e.target.value))}
        />
      </Col>
    </>
  )
}
