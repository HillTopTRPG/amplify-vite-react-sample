import { DashboardOutlined } from '@ant-design/icons'
import {
  Col,
  type Statistic,
  type GetProps,
  Typography,
  Space,
  Spin,
} from 'antd'
import { useNechronicaContext } from '../context'
import StatisticCardLayout from '@/components/StatisticCardLayout.tsx'
import StyledPie from '@/components/StyledPie.tsx'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import { useScreenContext } from '@/context/screen.ts'
import { useUserAttributes } from '@/context/userAttributes.ts'
import type { Screen } from '@/service'
import screens from '@/service/Nechronica/screens.ts'
import { type NechronicaType } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

const label = 'ダッシュボード'
const authorize = true
const viewMenu = true
const icon = DashboardOutlined
/* eslint-disable react-hooks/rules-of-hooks */
function contents() {
  const { loading, characters } = useNechronicaContext()
  const { currentUser } = useUserAttributes()
  const { setScreen } = useScreenContext()

  const getCharacterNum = (type: NechronicaType) => {
    return characters.filter((c) => {
      if (c.additionalData.type !== type) return false
      return c.owner === currentUser?.userName
    }).length
  }

  const statistics: [keyof typeof screens, number, string][] = [
    ['dolls', getCharacterNum('doll'), '体'],
    ['savants', getCharacterNum('savant'), '体'],
    ['horrors', getCharacterNum('horror'), '体'],
    ['legions', getCharacterNum('legion'), '種類'],
  ]
  const dashboardData: GetProps<typeof Statistic>[] = statistics.map(
    ([screen, value, suffix]) => ({
      title: screens[screen].label,
      value,
      valueRender: () =>
        loading ? (
          <Spin size="large" />
        ) : (
          <Typography.Link
            style={{ fontSize: '1em' }}
            onClick={() => setScreen(screen)}
          >
            <Space size={5}>
              <span>{value}</span>
              <span>{suffix}</span>
            </Space>
          </Typography.Link>
        ),
    }),
  )

  return (
    <ScreenContainer title={label} icon={icon}>
      <StatisticCardLayout title="キャラクターデータ" data={dashboardData}>
        <Col span={12}>
          <StyledPie data={dashboardData} height={150} />
        </Col>
        <Col span={12}>
          <StyledPie data={dashboardData} height={150} />
        </Col>
      </StatisticCardLayout>
    </ScreenContainer>
  )
}
/* eslint-enable react-hooks/rules-of-hooks */

const packed: Screen = {
  label,
  authorize,
  viewMenu,
  icon,
  contents,
}

export default packed
