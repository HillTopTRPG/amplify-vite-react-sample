import React from 'react'
import { Col, Popover, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { type NechronicaManeuver } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

type ManeuverPopoverProps = {
  maneuver: NechronicaManeuver
  onChangeOpen: (open: boolean) => void
  children: React.ReactNode
}
export default function ManeuverPopover({
  maneuver,
  onChangeOpen,
  children,
}: ManeuverPopoverProps) {
  const { t: i18nT } = useTranslation()

  const ColSetTCR = ({ item, value }: { item: string; value: string }) => {
    const colStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      height: 40,
    }
    return (
      <>
        <Col span={2} style={{ ...colStyle, backgroundColor: '#bdbdbd' }}>
          <Typography.Text
            strong
            style={{
              color: 'white',
              textShadow:
                '1px 1px 0 black,-1px -1px 0 black,-1px 1px 0 black,1px -1px 0 black,0px 1px 0 black,-1px 0 black,-1px 0 0 black,1px 0 0 black',
            }}
          >
            {item}
          </Typography.Text>
        </Col>
        <Col span={6} style={colStyle}>
          <Typography.Text>{value}</Typography.Text>
        </Col>
      </>
    )
  }

  const popoverContent = (
    <Row style={{ maxWidth: 336, padding: 8 }}>
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
    </Row>
  )

  return (
    <Popover
      content={popoverContent}
      trigger={['click', 'contextMenu']}
      overlayInnerStyle={{ padding: 0 }}
      onOpenChange={onChangeOpen}
    >
      {children}
    </Popover>
  )
}
