import { type CSSProperties, useId } from 'react'
import { useCharacterMakeContext } from '@Nechronica/components/BuildContents/context.ts'
import { Col, Select } from 'antd'

const options = [
  { label: '奈落', value: -2 },
  { label: '地獄', value: -1 },
  { label: '煉獄', value: 0 },
  { label: '花園', value: 1 },
  { label: '楽園', value: 2 },
]

const flexCenterStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'inherit',
} as const

interface Props {
  thSpan: number
  tdSpan: number
}
export default function SelectBasePositionItemSet({ thSpan, tdSpan }: Props) {
  const id = useId()
  const { basePosition, setBasePosition } = useCharacterMakeContext()
  return (
    <>
      <Col span={thSpan} style={flexCenterStyle}>
        <label
          htmlFor={id}
          style={{ ...flexCenterStyle, width: '100%', height: '100%' }}
        >
          初期配置
        </label>
      </Col>
      <Col span={tdSpan} style={flexCenterStyle}>
        <Select
          id={id}
          options={options}
          value={basePosition}
          onChange={setBasePosition}
        />
      </Col>
    </>
  )
}
