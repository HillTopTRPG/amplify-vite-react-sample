import { type CSSProperties, useId } from 'react'
import { type NechronicaBasic } from '@higanbina/ts/NechronicaDataHelper.ts'
import { Col } from 'antd'
import InputWrap from '@/components/InputWrap.tsx'
import {
  makingNechronicaCharacterBaseSelector,
  useAppDispatch,
  useSelector,
} from '@/store'
import { setMakingBasicData } from '@/store/nechronicaSlice.ts'
import type { OnlyTypeKey } from '@/utils/types.ts'

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
  property: OnlyTypeKey<NechronicaBasic, string>
  required?: 'required'
}
export default function TextItemSet({
  label,
  thSpan,
  tdSpan,
  property,
  required,
}: Props) {
  const id = useId()
  const dispatch = useAppDispatch()
  const basic = useSelector(makingNechronicaCharacterBaseSelector)
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
          value={basic[property]}
          addonAfter={required ? '必須' : undefined}
          placeholder={required ? '未入力' : undefined}
          style={{ width: '100%' }}
          required={true}
          onChange={(e) =>
            dispatch(setMakingBasicData({ value: e.target.value, property }))
          }
        />
      </Col>
    </>
  )
}
