import { Pie } from '@ant-design/plots'
import { type GetProps } from 'antd'
import { useThemeContext } from '@/context/theme.ts'

export default function StyledPie({
  data,
  height,
}: {
  data: unknown[]
  height: number
}) {
  const { theme } = useThemeContext()
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
    style: {
      color: 'red',
    },
  }
  return <Pie {...config} />
}