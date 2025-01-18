import { useCallback, useMemo, useState } from 'react'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Col, Flex, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import EditContents from './EditContents.tsx'
import ViewContents from './ViewContents.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import { type NechronicaManeuver } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import mapping from '@/service/Nechronica/ts/mapping.json'

interface Props {
  type: 'hover' | 'click'
  maneuver: NechronicaManeuver
  updateManeuver?: (
    fx: (maneuver: NechronicaManeuver) => NechronicaManeuver,
  ) => void
}
export default function ManeuverPopoverContents({
  type,
  maneuver,
  updateManeuver,
}: Props) {
  const { t: i18nT } = useTranslation()
  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const { setHoverManeuverId } = useNechronicaContext()

  const onMouseEnter = useCallback(() => {
    if (type !== 'hover') return
    setHoverManeuverId('')
  }, [setHoverManeuverId, type])

  return useMemo(
    () => (
      <div
        style={{
          maxWidth: 336,
          minWidth: 336,
          padding: 8,
          outline: `2px solid ${mapping.MANEUVER_TYPE[maneuver.type].color}`,
          outlineOffset: -2,
          margin: 0,
        }}
      >
        <Row
          gutter={mode === 'view' ? undefined : [6, 6]}
          onMouseEnter={onMouseEnter}
        >
          <Col span={24}>
            <Flex align="center">
              <Typography.Text style={{ flexGrow: 1 }}>
                {mode === 'view'
                  ? i18nT(mapping.MANEUVER_TYPE[maneuver.type].text)
                  : 'マニューバ編集'}
              </Typography.Text>
              <Button
                type="text"
                icon={mode === 'view' ? <EditOutlined /> : <EyeOutlined />}
                onClick={() => setMode((v) => (v === 'view' ? 'edit' : 'view'))}
              />
            </Flex>
          </Col>
          {mode === 'view' ? (
            <ViewContents maneuver={maneuver} />
          ) : (
            <EditContents maneuver={maneuver} updateManeuver={updateManeuver} />
          )}
        </Row>
      </div>
    ),
    [i18nT, maneuver, mode, onMouseEnter, updateManeuver],
  )
}
