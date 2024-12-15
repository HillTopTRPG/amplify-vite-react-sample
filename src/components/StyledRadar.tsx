import { type Chart, type PlotEvent, Radar } from '@ant-design/plots'
import { type Datum } from '@ant-design/plots/es/interface'
import { type GetProps } from 'antd'
import { useThemeContext } from '@/context/theme.ts'

type StyledRadarProps = {
  data: Datum
  width: number
  height: number
  onChangeItem: (type: 'pointerup' | 'pointermove', item: string) => void
}
export default function StyledRadar({
  data,
  width,
  height,
  onChangeItem,
}: StyledRadarProps) {
  const { theme } = useThemeContext()

  let lastItem = ''

  const onEvent = (chart: Chart, event: PlotEvent) => {
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
    width,
    height,
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
        gridLineWidth: 3,
        title: true,
        grid: true,
      },
      y: {
        gridLineWidth: 3,
        labelLineWidth: 3,
        label: false,
        title: false,
        border: '#ff0000',
        grid: true,
      },
    },
    legend: false,
    style: {
      lineWidth: 0,
      opacity: 0,
      axisBorder: false,
      scaleBorder: false,
      scaleLine: false,
      axisLine: false,
      border: 'none',
      axisFillOpacity: 0,
      axisLineStrokeOpacity: 0,
      axisLineStroke: '#ff0000',
      scaleLineStroke: '#ff0000',
      borderLineStroke: '#ff0000',
      frameLineStroke: '#ff0000',
      frameStroke: '#ff0000',
      scaleStroke: '#ff0000',
      axisStroke: '#ff0000',
    },
  }
  return <Radar {...config} style={{ lineWidth: 4 }} onEvent={onEvent} />
}
