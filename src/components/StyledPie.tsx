import { Pie } from '@ant-design/plots'
import { type GetProps } from 'antd'
import { useUserAttributes } from '@/context/userAttributes.ts'

export default function StyledPie({
  data,
  height,
}: {
  data: unknown[]
  height: number
}) {
  const { theme } = useUserAttributes()
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
