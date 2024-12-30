import { DashboardOutlined } from '@ant-design/icons'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import type { Screen } from '@/service'
import DashboardContents from '@/service/Nechronica/components/DashboardContents'

const spec = { label: 'ダッシュボード', icon: DashboardOutlined }

const screen: Screen = {
  ...spec,
  contents: () => (
    <ScreenContainer {...spec}>
      <DashboardContents />
    </ScreenContainer>
  ),
}
export default screen
