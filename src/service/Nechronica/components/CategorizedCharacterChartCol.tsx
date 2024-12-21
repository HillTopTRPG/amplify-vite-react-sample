import { useMemo, useState } from 'react'
import { Typography, Empty, Table, type TableColumnsType, Flex } from 'antd'
import StyledRadar, { makeChartData } from '@/components/StyledRadar.tsx'
import { useScreenContext } from '@/context/screen.ts'
import { type NechronicaCharacter } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import { emptiableFormat } from '@/utils/format.ts'

type CharacterChartData = {
  key: string
  item: string
  type: string
  score: number
}

export default function CategorizedCharacterChartCol({
  characters,
}: {
  characters: NechronicaCharacter[]
}) {
  const { screenSize } = useScreenContext()
  const chartSize = Math.min(screenSize.viewPortWidth, 400)

  const [currentItem, setCurrentItem] = useState('その他')

  const radarCharacterTypeData: CharacterChartData[] = useMemo(
    () => characters.map(makeChartData).flat(),
    [characters],
  )

  const columns: TableColumnsType<CharacterChartData> = useMemo(
    () => [
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
    ],
    [currentItem, radarCharacterTypeData],
  )

  const onChangeRadar = (_: 'pointerup' | 'pointermove', item: string) => {
    setCurrentItem(item)
  }

  const radar = useMemo(() => {
    return (
      emptiableFormat(radarCharacterTypeData, (v) => (
        <StyledRadar
          data={v}
          onChangeItem={onChangeRadar}
          type="large"
          size={chartSize}
        />
      )) ?? <Empty />
    )
  }, [chartSize, radarCharacterTypeData])

  const table = useMemo(() => {
    return (
      emptiableFormat(radarCharacterTypeData, (v) => (
        <Table<CharacterChartData>
          rowKey="key"
          dataSource={v
            .filter((d) => d.item === currentItem)
            .sort((d1, d2) => d2.score - d1.score)}
          columns={columns}
        />
      )) ?? <Empty />
    )
  }, [columns, currentItem, radarCharacterTypeData])

  return (
    <Flex wrap>
      <Flex vertical style={{ width: chartSize, paddingBottom: 0 }}>
        <Typography.Text type="secondary">チャート</Typography.Text>
        {radar}
      </Flex>
      <Flex vertical style={{ flexGrow: 1, minWidth: 300 }}>
        <Typography.Text type="secondary">テーブル</Typography.Text>
        {table}
      </Flex>
    </Flex>
  )
}
