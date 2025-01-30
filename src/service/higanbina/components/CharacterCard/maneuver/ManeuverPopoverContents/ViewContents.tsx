import { type NechronicaManeuver } from '@higanbina/ts/NechronicaDataHelper.ts'
import mapping from '@higanbina/ts/mapping.json'
import { Col, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import ColSetTCR from './ColSetTCR.tsx'

interface Props {
  maneuver: NechronicaManeuver
}
export default function ViewContents({ maneuver }: Props) {
  const { t: i18nT } = useTranslation()
  return (
    <>
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
      <ColSetTCR
        item="T"
        value={i18nT(mapping.MANEUVER_TIMING[maneuver.timing].text)}
      />
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
    </>
  )
}
