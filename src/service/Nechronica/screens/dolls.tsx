import { useState } from 'react'
import { DashboardOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Col,
  type Statistic,
  type GetProps,
  Typography,
  Space,
  Button,
  Input,
  Flex,
  Card,
} from 'antd'
import { useNechronicaContext } from '../context'
import StatisticCardLayout from '@/components/StatisticCardLayout.tsx'
import StyledPie from '@/components/StyledPie.tsx'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import { useScreenContext } from '@/context/screen.ts'
import { type Screens } from '@/layouts/MainContentsLauout.tsx'
import screens from '@/service/Nechronica/screens.ts'
import {
  type Nechronica,
  NechronicaDataHelper,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

const label = 'ドール'
const authorize = true
const icon = DashboardOutlined
/* eslint-disable react-hooks/rules-of-hooks */
function contents() {
  const { dolls, savants, horrors, legions, createDoll } =
    useNechronicaContext()
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

  const [loadSheets, setLoadSheets] = useState<Nechronica[]>([])

  const loadSheetsElm = loadSheets.map((sheet) => {
    return (
      <Card key={sheet.url} title={sheet.basic.characterName}>
        <Card.Grid>aaaa</Card.Grid>
        <Card.Grid>bbbb</Card.Grid>
        <Card.Grid>cccc</Card.Grid>
      </Card>
    )
  })

  const onChangeSheetUrl = async (id: string) => {
    const url = `https://charasheet.vampire-blood.net/${id}`
    if (loadSheets.some((s) => s.url === url)) return
    const helper = new NechronicaDataHelper(url, (s) => s)
    if (!helper.isThis()) return
    const data = (await helper.getData())?.data
    if (!data) return
    setLoadSheets((o) => [...o, data])
  }

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
          <Button onClick={() => createDoll({})} icon={<PlusOutlined />} />
        </Col>
      </StatisticCardLayout>
      <Flex vertical align="flex-start">
        <Typography.Text>キャラクター保管所のシートID</Typography.Text>
        <Input.OTP length={7} onChange={onChangeSheetUrl} />
      </Flex>
      <Flex>{loadSheetsElm}</Flex>
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
