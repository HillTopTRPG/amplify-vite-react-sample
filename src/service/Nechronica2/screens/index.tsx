import { DashboardOutlined } from '@ant-design/icons'
import { Col, type Statistic, type GetProps, Typography, Space } from 'antd'
import { useNechronicaContext, useTodoCrud } from '../../Nechronica/context'
import StatisticCardLayout from '@/components/StatisticCardLayout.tsx'
import StyledPie from '@/components/StyledPie.tsx'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import Todos from '@/components/todo/Todos.tsx'
import { useScreenContext } from '@/context/screen.ts'
import type { Screens } from '@/layouts/MainContentsLauout.tsx'
import screens from '@/service/Nechronica/screens.ts'

const label = 'ダッシュボード'
const authorize = true
const icon = DashboardOutlined
/* eslint-disable react-hooks/rules-of-hooks */
function contents() {
  const { dolls, savants, horrors, legions, loading } = useNechronicaContext()
  const todoCrud = useTodoCrud()
  const { setScreen } = useScreenContext()

  const statistics: [keyof Screens, number, string][] = [
    ['dolls', dolls.length, '体'],
    ['savants', savants.length, '体'],
    ['horrors', horrors.length, '体'],
    ['legions', legions.length, '種類'],
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
      <Todos {...todoCrud} loading={loading} />
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
