import DashboardContents from '@Nechronica/components/DashboardContents'
import { screens } from '@Nechronica/screens.ts'
import { DashboardOutlined } from '@ant-design/icons'
import ScreenContainer from '@/components/ScreenContainer.tsx'
import type { Screen } from '@/service'

const spec = { label: 'ダッシュボード', icon: DashboardOutlined }

const screen: Screen = {
  ...spec,
  contents: () => (
    <ScreenContainer {...spec} screens={screens}>
      <DashboardContents />
    </ScreenContainer>
  ),
}
export default screen
