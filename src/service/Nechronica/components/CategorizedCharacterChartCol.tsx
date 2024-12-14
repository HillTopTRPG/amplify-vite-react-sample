import { useMemo, useState } from 'react'
import {
  Col,
  Typography,
  Card,
  Empty,
  Table,
  type TableColumnsType,
} from 'antd'
import StyledRadar from '@/components/StyledRadar.tsx'
import {
  type Nechronica,
  type NechronicaType,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import { emptiableFormat } from '@/utils/format.ts'

export default function CategorizedCharacterChartCol({
  characters,
}: {
  characters: { id: string; type: NechronicaType; data: Nechronica }[]
}) {
  const chartBoxSize = 400
  const chartSize = chartBoxSize - 48

  type CharacterChartData = {
    key: string
    item: string
    type: string
    score: number
  }

  const [currentItem, setCurrentItem] = useState('その他')

  const makeChartItemBase = (
    item: string,
    { id, data }: { id: string; data: Nechronica },
  ): CharacterChartData => ({
    key: `${id}-${item}`,
    item,
    type: data.basic.characterName,
    score: 0,
  })

  const NECHRONICA_MANEUVER_TYPES = [
    'その他',
    '通常技',
    '必殺技',
    '行動値増加',
    '補助',
    '妨害',
    '防御/生贄',
    '移動',
  ]

  const radarCharacterTypeData: CharacterChartData[] = characters
    .map((d) => {
      const items = [
        makeChartItemBase('通常技', d),
        makeChartItemBase('必殺技', d),
        makeChartItemBase('行動値増加', d),
        makeChartItemBase('補助', d),
        makeChartItemBase('妨害', d),
        makeChartItemBase('防御/生贄', d),
        makeChartItemBase('移動', d),
        makeChartItemBase('その他', d),
      ]
      d.data.maneuverList.forEach((maneuver) => {
        NECHRONICA_MANEUVER_TYPES.filter(
          (_, index) => index === maneuver.type,
        ).forEach((type) => {
          const item = items.find((item) => item.item === type)
          if (!item) return
          item.score += 1
        })
      })
      return items
    })
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
      title: currentItem,
      dataIndex: 'score',
      key: 'score',
      render: (v) => `${v}個`,
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
          {emptiableFormat(radarCharacterTypeData, (v) => (
            <Table<CharacterChartData>
              rowKey="key"
              dataSource={v
                .filter((d) => d.item === currentItem)
                .sort((d1, d2) => d2.score - d1.score)}
              columns={columns}
            />
          )) ?? <Empty />}
        </Card.Grid>
      </Card>
    </Col>
  )
}
