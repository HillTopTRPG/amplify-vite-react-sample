import { type CSSProperties, useId } from 'react'
import { Col, Select } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  selectMakingCharacterBase,
  setMakingBasicData,
} from '@/store/nechronicaSlice.ts'

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
  const dispatch = useAppDispatch()
  const { basePosition } = useAppSelector(selectMakingCharacterBase)
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
          onChange={(value) =>
            dispatch(setMakingBasicData({ value, property: 'basePosition' }))
          }
        />
      </Col>
    </>
  )
}
