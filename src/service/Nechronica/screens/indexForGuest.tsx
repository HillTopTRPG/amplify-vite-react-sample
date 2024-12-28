import { DashboardOutlined } from '@ant-design/icons'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import type { Screen } from '@/service'
import DashboardContents from '@/service/Nechronica/components/DashboardContents.tsx'

const label = 'ダッシュボード'
const icon = DashboardOutlined
const contents = () => (
  <ScreenContainer title={label} icon={icon}>
    <DashboardContents />
  </ScreenContainer>
)

const packed: Screen = {
  label,
  authorize: false,
  icon,
  contents,
}

export default packed
