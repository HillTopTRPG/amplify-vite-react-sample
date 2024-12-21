import { type Chart, type PlotEvent, Radar } from '@ant-design/plots'
import { type Datum } from '@ant-design/plots/es/interface'
import { type GetProps } from 'antd'
import style from './StyledRadar.module.css'
import { useUserAttributes } from '@/context/userAttributes.ts'
import { type NechronicaCharacter } from '@/service/Nechronica'

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

type CharacterChartData = {
  key: string
  item: string
  type: string
  score: number
}

const makeChartItemBase = (
  item: string,
  { id, sheetData }: NechronicaCharacter,
): CharacterChartData => ({
  key: `${id}-${item}`,
  item,
  type: sheetData.basic.characterName,
  score: 0,
})

// eslint-disable-next-line react-refresh/only-export-components
export function makeChartData(d: NechronicaCharacter) {
  const items = [
    makeChartItemBase('通常技', d),
    makeChartItemBase('必殺技', d),
    makeChartItemBase('行動値増加', d),
    makeChartItemBase('補助', d),
    makeChartItemBase('妨害', d),
    makeChartItemBase('防御/生贄', d),
    makeChartItemBase('移動', d),
  ]
  d.sheetData.maneuverList.forEach((maneuver) => {
    NECHRONICA_MANEUVER_TYPES.filter(
      (_, index) => index === maneuver.type,
    ).forEach((type) => {
      const item = items.find((item) => item.item === type)
      if (!item) return
      item.score += 1
    })
  })
  return items
}

type StyledRadarProps = {
  data: Datum
  type: 'large' | 'small'
  size: number
  cursor?: 'default' | 'pointer'
  onChangeItem?: (type: 'pointerup' | 'pointermove', item: string) => void
}
export default function StyledRadar({
  data,
  type,
  size,
  onChangeItem,
  cursor = 'default',
}: StyledRadarProps) {
  const { theme } = useUserAttributes()

  let lastItem = ''

  const onEvent = (chart: Chart, event: PlotEvent) => {
    if (!onChangeItem) return

    const item: string = chart.container.tooltipElement?.attributes.title ?? ''
    if (event.type === 'pointermove') {
      if (lastItem === item) return
      lastItem = item
    }

    if (!['pointerup', 'pointermove'].includes(event.type)) return

    onChangeItem(event.type, item)
  }

  const config: GetProps<typeof Radar> = {
    theme,
    data,
    width: size,
    height: size,
    autoFit: true,
    xField: 'item',
    yField: 'score',
    colorField: 'type',
    shapeField: 'smooth',
    area: {
      style: {
        fillOpacity: 0.5,
      },
    },
    scale: {
      x: { padding: 0.5, align: 0, label: false },
      y: { tickCount: 5, nice: true, label: false },
    },
    axis: {
      x: {
        gridLineWidth: type === 'small' ? 1.5 : 3,
        title: true,
        grid: true,
      },
      y: {
        gridLineWidth: type === 'small' ? 1.5 : 3,
        label: false,
        title: false,
        grid: true,
      },
    },
    legend: false,
    style: {
      lineWidth: type === 'small' ? 2 : 4,
    },
    radiusAxis: false,
    tooltip: type === 'small' ? false : undefined,
  }
  return (
    <Radar
      {...config}
      className={style[`radar-container-${cursor}`]}
      onEvent={onEvent}
    />
  )
}
