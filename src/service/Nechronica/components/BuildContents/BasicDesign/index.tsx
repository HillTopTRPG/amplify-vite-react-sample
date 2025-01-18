import {
  type ChangeEvent,
  type CSSProperties,
  useCallback,
  useMemo,
} from 'react'
import { Col, type InputProps, Radio, Row } from 'antd'
import InputWrap from '@/components/InputWrap.tsx'
import DollTypeSelectItemSet from '@/service/Nechronica/components/BuildContents/BasicDesign/DollTypeSelectItemSet.tsx'
import { useCharacterMakeContext } from '@/service/Nechronica/components/BuildContents/context.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'
import { parseIntOrNull } from '@/service/common/PrimaryDataUtility.ts'

const gridGutter: [number, number] = [5, 5] as const

const statusSpan = 3

const flexCenterStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

export default function BasicDesign() {
  const {
    position,
    setPosition,
    mainClass,
    setMainClass,
    subClass,
    setSubClass,
    bonusStatus,
    setBonusStatus,
    affection,
    setAffection,
  } = useCharacterMakeContext()

  const makeAffectionInputProps = useCallback(
    (property: 'armed' | 'mutation' | 'modification'): InputProps => {
      const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setAffection((v) => ({
          ...v,
          [property]: e.target.value,
        }))
      return {
        value: affection[property],
        style: { width: '100%' },
        styles: { input: { textAlign: 'center' } },
        onChange,
      }
    },
    [affection, setAffection],
  )

  const getTotalValue = useCallback(
    (property: 'armed' | 'mutation' | 'modification') => {
      const mainClassValue = mapping.CHARACTER_CLASS[mainClass][property]
      const subClassValue = mapping.CHARACTER_CLASS[subClass][property]
      const bonusValue = bonusStatus === property ? 1 : 0
      const affectionValue = parseIntOrNull(affection[property]) ?? 0
      return mainClassValue + subClassValue + bonusValue + affectionValue
    },
    [affection, bonusStatus, mainClass, subClass],
  )

  const armedTotal = useMemo(() => getTotalValue('armed'), [getTotalValue])
  const mutationTotal = useMemo(
    () => getTotalValue('mutation'),
    [getTotalValue],
  )
  const modificationTotal = useMemo(
    () => getTotalValue('modification'),
    [getTotalValue],
  )

  return (
    <Row style={{ width: '360px', fontSize: 12 }} gutter={gridGutter}>
      <Col span={24 - statusSpan * 3}></Col>
      <Col span={statusSpan} style={flexCenterStyle}>
        武装
      </Col>
      <Col span={statusSpan} style={flexCenterStyle}>
        変異
      </Col>
      <Col span={statusSpan} style={flexCenterStyle}>
        改造
      </Col>
      <DollTypeSelectItemSet
        label="ポジション"
        value={position}
        onChange={setPosition}
        optionMap={mapping.CHARACTER_POSITION}
      />
      <Col span={statusSpan} style={flexCenterStyle}>
        -
      </Col>
      <Col span={statusSpan} style={flexCenterStyle}>
        -
      </Col>
      <Col span={statusSpan} style={flexCenterStyle}>
        -
      </Col>
      <DollTypeSelectItemSet
        label="メインクラス"
        value={mainClass}
        onChange={setMainClass}
        optionMap={mapping.CHARACTER_CLASS}
      />
      <Col span={statusSpan} style={flexCenterStyle}>
        {mapping.CHARACTER_CLASS[mainClass].armed}
      </Col>
      <Col span={statusSpan} style={flexCenterStyle}>
        {mapping.CHARACTER_CLASS[mainClass].mutation}
      </Col>
      <Col span={statusSpan} style={flexCenterStyle}>
        {mapping.CHARACTER_CLASS[mainClass].modification}
      </Col>
      <DollTypeSelectItemSet
        label="サブクラス"
        value={subClass}
        onChange={setSubClass}
        optionMap={mapping.CHARACTER_CLASS}
      />
      <Col span={statusSpan} style={flexCenterStyle}>
        {mapping.CHARACTER_CLASS[subClass].armed}
      </Col>
      <Col span={statusSpan} style={flexCenterStyle}>
        {mapping.CHARACTER_CLASS[subClass].mutation}
      </Col>
      <Col span={statusSpan} style={flexCenterStyle}>
        {mapping.CHARACTER_CLASS[subClass].modification}
      </Col>
      <Col span={24 - statusSpan * 3} style={{ textAlign: 'center' }}>
        ボーナス
      </Col>
      <Col span={9}>
        <Row gutter={gridGutter}>
          <Radio.Group
            value={bonusStatus}
            onChange={(e) => setBonusStatus(e.target.value)}
            style={{ width: '100%', display: 'inline-flex' }}
          >
            <Col span={8} style={flexCenterStyle}>
              <Radio value="armed" style={{ margin: 0 }} />
            </Col>
            <Col span={8} style={flexCenterStyle}>
              <Radio value="mutation" style={{ margin: 0 }} />
            </Col>
            <Col span={8} style={flexCenterStyle}>
              <Radio value="modification" style={{ margin: 0 }} />
            </Col>
          </Radio.Group>
        </Row>
      </Col>
      <Col span={24 - statusSpan * 3} style={flexCenterStyle}>
        寵愛による修正
      </Col>
      <Col span={statusSpan} style={flexCenterStyle}>
        <InputWrap {...makeAffectionInputProps('armed')} />
      </Col>
      <Col span={statusSpan} style={flexCenterStyle}>
        <InputWrap {...makeAffectionInputProps('mutation')} />
      </Col>
      <Col span={statusSpan} style={flexCenterStyle}>
        <InputWrap {...makeAffectionInputProps('modification')} />
      </Col>
      <Col
        span={24 - statusSpan * 3}
        style={{ ...flexCenterStyle, fontWeight: 'bold' }}
      >
        総計
      </Col>
      <Col span={statusSpan} style={{ ...flexCenterStyle, fontWeight: 'bold' }}>
        {armedTotal}
      </Col>
      <Col span={statusSpan} style={{ ...flexCenterStyle, fontWeight: 'bold' }}>
        {mutationTotal}
      </Col>
      <Col span={statusSpan} style={{ ...flexCenterStyle, fontWeight: 'bold' }}>
        {modificationTotal}
      </Col>
      <Col span={24 - statusSpan * 3}></Col>
      <Col span={statusSpan} style={flexCenterStyle}>
        武装
      </Col>
      <Col span={statusSpan} style={flexCenterStyle}>
        変異
      </Col>
      <Col span={statusSpan} style={flexCenterStyle}>
        改造
      </Col>
    </Row>
  )
}
