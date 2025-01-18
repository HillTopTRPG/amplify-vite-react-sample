import { useCallback } from 'react'
import { Col } from 'antd'
import { useTranslation } from 'react-i18next'
import ManeuverTextItemInput from './form/ManeuverTextItemInput.tsx'
import ManeuverItemCheckbox from '@/service/Nechronica/components/CharacterCard/maneuver/ManeuverPopoverContents/form/ManeuverItemCheckbox.tsx'
import ManeuverItemSelect from '@/service/Nechronica/components/CharacterCard/maneuver/ManeuverPopoverContents/form/ManeuverItemSelect.tsx'
import { type NechronicaManeuver } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

interface Props {
  maneuver: NechronicaManeuver
  updateManeuver?: (
    fx: (maneuver: NechronicaManeuver) => NechronicaManeuver,
  ) => void
}
export default function EditContents({ maneuver, updateManeuver }: Props) {
  const { t: i18nT } = useTranslation()

  const updateManeuverWrap = useCallback(
    (property: keyof NechronicaManeuver, value: string | number | boolean) => {
      if (!updateManeuver) return
      updateManeuver((maneuver) => ({ ...maneuver, [property]: value }))
    },
    [updateManeuver],
  )

  return (
    <>
      <Col span={12}>
        <ManeuverItemSelect
          label="カテゴリ"
          value={maneuver.type}
          onChange={(v) => updateManeuverWrap('type', v)}
          options={mapping.MANEUVER_TYPE.map((mt, idx) => ({
            label: i18nT(mt.text),
            value: idx,
          }))}
        />
      </Col>
      <Col span={12}>
        <ManeuverItemSelect
          label="部位"
          value={maneuver.parts}
          onChange={(v) => updateManeuverWrap('parts', v)}
          options={mapping.MANEUVER_PARTS.map((mt, idx) => ({
            label: mt || '-',
            value: idx,
          }))}
        />
      </Col>
      <Col span={24}>
        <ManeuverTextItemInput
          label="マニューバ名"
          value={maneuver.name}
          onChange={(v) => updateManeuverWrap('name', v)}
        />
      </Col>
      <Col span={10}>
        <ManeuverItemSelect
          label="タイミング"
          value={maneuver.timing}
          onChange={(v) => updateManeuverWrap('timing', v)}
          options={mapping.MANEUVER_TIMING.map((mt, idx) => ({
            label: i18nT(mt.text),
            value: idx,
          }))}
        />
      </Col>
      <Col span={7}>
        <ManeuverTextItemInput
          label="コスト"
          value={maneuver.cost}
          onChange={(v) => updateManeuverWrap('cost', v)}
        />
      </Col>
      <Col span={7}>
        <ManeuverTextItemInput
          label="射程"
          value={maneuver.range}
          onChange={(v) => updateManeuverWrap('range', v)}
        />
      </Col>
      <Col span={24}>
        <ManeuverTextItemInput
          label="効果"
          value={maneuver.memo}
          onChange={(v) => updateManeuverWrap('memo', v)}
          multiLine
        />
      </Col>
      <Col span={24}>
        <ManeuverTextItemInput
          label="取得元"
          value={maneuver.shozoku}
          onChange={(v) => updateManeuverWrap('shozoku', v)}
        />
      </Col>
      <Col span={24}>
        <ManeuverItemCheckbox
          label="平気として扱う"
          value={maneuver.isBravado}
          onChange={(v) => updateManeuverWrap('isBravado', v)}
        />
      </Col>
    </>
  )
}
