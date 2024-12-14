import { DashboardOutlined } from '@ant-design/icons'
import { Typography, Row } from 'antd'
import { useNechronicaContext } from '../context'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import CategorizedCharacterChartCol from '@/service/Nechronica/components/CategorizedCharacterChartCol.tsx'
import InputSheetId from '@/service/Nechronica/components/InputSheetId.tsx'

const label = 'ドール'
const authorize = true
const icon = DashboardOutlined
/* eslint-disable react-hooks/rules-of-hooks */
function contents() {
  const { dolls, createCharacter } = useNechronicaContext()

  return (
    <ScreenContainer title={label} icon={icon}>
      <Typography.Title level={5}>概要</Typography.Title>
      <Row gutter={[16, 16]} align="middle" justify="start">
        <CategorizedCharacterChartCol characters={dolls} />
      </Row>
      <Typography.Title level={5}>{label}追加</Typography.Title>
      <InputSheetId onFetchData={createCharacter.bind(null, 'doll')} />
    </ScreenContainer>
  )
}
/* eslint-enable react-hooks/rules-of-hooks */

const packed = {
  label,
  authorize,
  icon,
  contents,
}

export default packed
