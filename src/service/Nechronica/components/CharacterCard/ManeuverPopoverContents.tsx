import { useMemo } from 'react'
import { Col, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import ColSetTCR from '@/service/Nechronica/components/CharacterCard/ColSetTCR.tsx'
import { type NechronicaManeuver } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

interface Props {
  maneuver: NechronicaManeuver
  onMouseEnter?: () => void
}
export default function ManeuverPopoverContents({
  maneuver,
  onMouseEnter,
}: Props) {
  const { t: i18nT } = useTranslation()
  const timing = i18nT(mapping.MANEUVER_TIMING[maneuver.timing].text)
  return useMemo(
    () => (
      <Row onMouseEnter={onMouseEnter} style={{ maxWidth: 336, padding: 8 }}>
        <Col span={24}>
          <Typography.Text>
            {i18nT(mapping.MANEUVER_TYPE[maneuver.type].text)}
          </Typography.Text>
        </Col>
        <Col span={24}>
          <Typography.Title
            level={4}
            style={{
              margin: 0,
              color: '#ccc',
              backgroundColor: '#424242',
              padding: '6px 0',
            }}
          >
            【{maneuver.name}】
          </Typography.Title>
        </Col>
        <ColSetTCR item="T" value={timing} />
        <ColSetTCR item="C" value={maneuver.cost} />
        <ColSetTCR item="R" value={maneuver.range} />
        <Col
          span={4}
          style={{
            backgroundColor: '#424242',
            display: 'flex',
            justifyContent: 'center',
            padding: '4px 0',
            minHeight: 80,
          }}
        >
          <Typography.Text style={{ color: '#ccc' }}>効果</Typography.Text>
        </Col>
        <Col span={20} style={{ padding: '4px 8px' }}>
          <Typography.Text>{maneuver.memo}</Typography.Text>
        </Col>
      </Row>
    ),
    [
      i18nT,
      maneuver.cost,
      maneuver.memo,
      maneuver.name,
      maneuver.range,
      maneuver.type,
      onMouseEnter,
      timing,
    ],
  )
}
