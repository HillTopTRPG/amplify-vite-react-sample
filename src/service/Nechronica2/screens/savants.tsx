import { DashboardOutlined } from '@ant-design/icons'
import { Col, type Statistic, type GetProps, Typography, Space } from 'antd'
import StatisticCardLayout from '@/components/StatisticCardLayout.tsx'
import StyledPie from '@/components/StyledPie.tsx'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import { useScreenContext } from '@/context/screen.ts'
import type { Screen } from '@/service'
import screens from '@/service/Nechronica/screens.ts'

const label = 'サヴァント'
const icon = DashboardOutlined
/* eslint-disable react-hooks/rules-of-hooks */
function contents() {
  const { setScreen } = useScreenContext()

  const statistics: [keyof typeof screens, number, string][] = [
    ['dolls', 3, '体'],
    ['savants', 4, '体'],
    ['horrors', 5, '体'],
    ['legions', 6, '種類'],
  ]
  const dashboardData: GetProps<typeof Statistic>[] = statistics.map(
    ([screen, value, suffix]) => ({
      title: screens[screen].label,
      value,
      valueRender: () => (
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
  authorize: true,
  icon,
  contents,
}

export default packed
