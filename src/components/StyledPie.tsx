import { Pie } from '@ant-design/plots'
import { type GetProps } from 'antd'
import { themeSelector, useSelector } from '@/store'

export default function StyledPie({
  data,
  height,
}: {
  data: unknown[]
  height: number
}) {
  const theme = useSelector(themeSelector)
  const config: GetProps<typeof Pie> = {
    theme,
    data,
    angleField: 'value',
    colorField: 'title',
    innerRadius: 0.4,
    height,
    label: {
      text: 'value',
    },
  }
  return <Pie {...config} />
}
