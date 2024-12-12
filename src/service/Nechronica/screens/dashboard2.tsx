import { VideoCameraOutlined } from '@ant-design/icons'
import {
  Row,
  Col,
  Typography,
  type Statistic,
  type GetProps,
  Flex,
  Button,
  Space,
} from 'antd'
import { useNechronicaContext, useTodoCrud } from '../context'
import StatisticCardLayout from '@/components/StatisticCardLayout.tsx'
import StyledPie from '@/components/StyledPie.tsx'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import Todos from '@/components/todo/Todos.tsx'
import { useScreenContext } from '@/context/screen.ts'
import { useTestContext } from '@/context/test'
import type { Screens } from '@/layouts/MainContentsLauout.tsx'
import screens from '@/service/Nechronica/screens.ts'

const label = 'ダッシュボード2'
const authorize = true
const icon = VideoCameraOutlined
/* eslint-disable react-hooks/rules-of-hooks */
function contents() {
  const { dolls, savants, horrors, legions, loading } = useNechronicaContext()
  const todoCrud = useTodoCrud()
  const { test1, test2Obj, test3, incrementTest1, incrementTest2, outputText } =
    useTestContext()
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
      <Typography.Title level={5}>Test</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Flex align="center" gap={10}>
            <Typography.Text>{test1}</Typography.Text>
            <Button type="primary" onClick={incrementTest1}>
              Add Test1
            </Button>
            <Typography.Text>{test2Obj.test2}</Typography.Text>
            <Button type="primary" onClick={incrementTest2}>
              Add Test2
            </Button>
            <Typography.Text>{test3}</Typography.Text>
            <Typography.Text>{outputText}</Typography.Text>
          </Flex>
        </Col>
      </Row>
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
