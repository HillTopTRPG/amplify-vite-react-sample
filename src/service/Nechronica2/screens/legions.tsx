import { DashboardOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Col,
  type Statistic,
  type GetProps,
  Typography,
  Row,
  Space,
  Button,
} from 'antd'
import StatisticCardLayout from '@/components/StatisticCardLayout.tsx'
import StyledPie from '@/components/StyledPie.tsx'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import TodoContainer from '@/components/todo/TodoContainer.tsx'
import { useNechronicaContext } from '@/context/nechronica.ts'
import { useScreenContext } from '@/context/screen.ts'
import type { Screens } from '@/layouts/MainContentsLauout.tsx'
import screens from '@/service/Nechronica/screens.ts'

const label = 'レギオン'
const authorize = true
const icon = DashboardOutlined
/* eslint-disable react-hooks/rules-of-hooks */
function contents() {
  const {
    todos,
    createTodo,
    deleteTodo,
    dolls,
    savants,
    horrors,
    legions,
    addLegion,
  } = useNechronicaContext()
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
        <Col span={24}>
          <Button onClick={() => addLegion({})} icon={<PlusOutlined />} />
        </Col>
      </StatisticCardLayout>
      <Typography.Title level={5}>TODO</Typography.Title>
      <Row gutter={4}>
        <Col span={8}>
          <TodoContainer
            todos={todos}
            createTodo={createTodo}
            deleteTodo={deleteTodo}
          />
        </Col>
        <Col span={8}>
          <TodoContainer
            todos={todos}
            createTodo={createTodo}
            deleteTodo={deleteTodo}
          />
        </Col>
        <Col span={8}>
          <TodoContainer
            todos={todos}
            createTodo={createTodo}
            deleteTodo={deleteTodo}
          />
        </Col>
      </Row>
      <Typography.Title level={5}>TODO</Typography.Title>
      <Row gutter={4}>
        <Col span={8}>
          <TodoContainer
            todos={todos}
            createTodo={createTodo}
            deleteTodo={deleteTodo}
          />
        </Col>
        <Col span={8}>
          <TodoContainer
            todos={todos}
            createTodo={createTodo}
            deleteTodo={deleteTodo}
          />
        </Col>
        <Col span={8}>
          <TodoContainer
            todos={todos}
            createTodo={createTodo}
            deleteTodo={deleteTodo}
          />
        </Col>
      </Row>
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
