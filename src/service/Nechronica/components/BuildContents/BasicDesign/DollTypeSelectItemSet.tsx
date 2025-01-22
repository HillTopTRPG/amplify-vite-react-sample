import { type CSSProperties, useId } from 'react'
import { Col, Select } from 'antd'

const flexCenterEndStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  fontSize: 'inherit',
}

interface Props {
  label: string
  value: number
  onChange: (val: number) => void
  optionMap: { text: string }[]
}
export default function DollTypeSelectItemSet({
  label,
  value,
  onChange,
  optionMap,
}: Props) {
  const id = useId()
  return (
    <>
      <Col span={6} style={flexCenterEndStyle}>
        <label
          htmlFor={id}
          style={{ ...flexCenterEndStyle, width: '100%', height: '100%' }}
        >
          {label}
        </label>
      </Col>
      <Col span={9}>
        <Select
          id={id}
          value={value}
          onChange={onChange}
          style={{ width: '100%' }}
          options={optionMap.map((p, idx) => ({
            value: idx,
            label: p.text || '-',
          }))}
        />
      </Col>
    </>
  )
}
