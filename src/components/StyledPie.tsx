import { Pie } from '@ant-design/plots'
import { type GetProps } from 'antd'
import { useAppSelector } from '@/store'
import { selectTheme } from '@/store/themeSlice.ts'

export default function StyledPie({
  data,
  height,
}: {
  data: unknown[]
  height: number
}) {
  const themeType = useAppSelector(selectTheme)
  const config: GetProps<typeof Pie> = {
    theme: themeType,
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
