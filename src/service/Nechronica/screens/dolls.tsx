import { useMemo, useState } from 'react'
import {
  DashboardOutlined,
  DeleteOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import {
  Col,
  Typography,
  Button,
  Input,
  Flex,
  Card,
  Row,
  Empty,
  Table,
  type TableColumnsType,
} from 'antd'
import { useNechronicaContext } from '../context'
import StyledRadar from '@/components/StyledRadar.tsx'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import {
  type Nechronica,
  NechronicaDataHelper,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import { emptiableFormat } from '@/utils/format.ts'

const label = 'ドール'
const authorize = true
const icon = DashboardOutlined
/* eslint-disable react-hooks/rules-of-hooks */
function contents() {
  const { dolls, createCharacter } = useNechronicaContext()
  const chartBoxSize = 400
  const chartSize = chartBoxSize - 48

  console.log('###############')
  console.log(JSON.stringify(dolls))

  const [loadSheets, setLoadSheets] = useState<Nechronica[]>([])

  const onDeleteTempSheet = (sheet: Nechronica) => {
    setLoadSheets((list) => list.filter(({ url }) => url !== sheet.url))
  }

  const onSaveTempSheet = (sheet: Nechronica) => {
    createCharacter(sheet.sheetId, 'doll', sheet as never)
    console.log(JSON.stringify(sheet))
    onDeleteTempSheet(sheet)
  }

  const loadSheetsElm = loadSheets.map((sheet) => {
    return (
      <Card
        key={sheet.url}
        title={sheet.basic.characterName}
        actions={[
          <Button
            icon={<DeleteOutlined />}
            type="text"
            onClick={() => onDeleteTempSheet(sheet)}
          />,
          <Button
            icon={<SaveOutlined />}
            type="text"
            onClick={() => onSaveTempSheet(sheet)}
          />,
        ]}
      ></Card>
    )
  })

  const [otpValue, setOtpValue] = useState('')
  const onInputSheetId = (id: string[]) => {
    const str = id
      .join('')
      .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    setOtpValue(str)
  }

  const onChangeSheetId = async (id: string) => {
    const url = `https://charasheet.vampire-blood.net/${id}`
    if (loadSheets.some((s) => s.url === url)) return
    const helper = new NechronicaDataHelper(id, url, (s) => s)
    if (!helper.isThis()) return
    const data = (await helper.getData())?.data
    if (!data) return
    setLoadSheets((o) => [...o, data])
    setOtpValue('')
  }

  type CharacterChartData = {
    key: string
    item: string
    type: string
    score: number
  }

  const [currentItem, setCurrentItem] = useState('攻撃')

  const radarCharacterTypeData: CharacterChartData[] = dolls
    .map((d) =>
      ['攻撃', '防御', '支援', '妨害', '移動', 'その他'].map((item) => ({
        key: d.id,
        item,
        type: (JSON.parse(d.sheetData) as Nechronica).basic.characterName,
        score: Math.floor(Math.random() * 8),
      })),
    )
    .flat()

  const columns: TableColumnsType<CharacterChartData> = [
    {
      title: 'キャラ名',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => (a.type < b.type ? -1 : 1),
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
    },
    {
      title: 'Value',
      dataIndex: 'score',
      key: 'score',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.score - b.score,
      filters: radarCharacterTypeData
        .map((d) => d.score)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort()
        .map((d) => ({
          text: d.toString(),
          value: d,
        })),
      onFilter: (value, record) => record.score === value,
    },
  ]

  const onChangeRadar = useMemo(
    () => (type: 'pointerup' | 'pointermove', item: string) => {
      console.log(type, item)
      setCurrentItem(item)
    },
    [],
  )

  return (
    <ScreenContainer title={label} icon={icon}>
      <Typography.Title level={5}>概要</Typography.Title>
      <Row gutter={[16, 16]} align="middle" justify="start">
        <Col span={24}>
          <Card bordered={false}>
            <Card.Grid
              style={{
                width: chartBoxSize,
                paddingBottom: 0,
              }}
              hoverable={false}
            >
              <Typography.Text type="secondary">チャート</Typography.Text>
              {emptiableFormat(radarCharacterTypeData, (v) => (
                <StyledRadar
                  data={v}
                  onChangeItem={onChangeRadar}
                  width={chartSize}
                  height={chartSize}
                />
              )) ?? <Empty />}
            </Card.Grid>
            <Card.Grid
              style={{
                paddingBottom: 0,
                flexGrow: 1,
                minWidth: 300,
              }}
              hoverable={false}
            >
              {currentItem}
              {emptiableFormat(radarCharacterTypeData, (v) => (
                <Table<CharacterChartData>
                  rowKey="key"
                  dataSource={v
                    .filter((d) => d.item === currentItem)
                    .sort((d1, d2) => d2.score - d1.score)}
                  columns={columns}
                  style={{ height: 400 }}
                />
              )) ?? <Empty />}
            </Card.Grid>
          </Card>
        </Col>
      </Row>
      <Typography.Title level={5}>ドール追加</Typography.Title>
      <Flex vertical align="flex-start">
        <Typography.Text>キャラクター保管所のシートID</Typography.Text>
        <Input.OTP
          value={otpValue}
          length={7}
          onInput={onInputSheetId}
          onChange={onChangeSheetId}
        />
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
