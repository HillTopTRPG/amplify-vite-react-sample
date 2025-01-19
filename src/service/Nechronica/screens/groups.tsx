import DashboardContents from '@Nechronica/components/DashboardContents'
import { GroupOutlined } from '@ant-design/icons'
import ScreenContainer from '@/components/ScreenContainer.tsx'
import type { Screen } from '@/service'

const spec = { label: 'キャラクターグループ', icon: GroupOutlined }

const screen: Screen = {
  ...spec,
  contents: () => (
    <ScreenContainer {...spec}>
      <DashboardContents />
    </ScreenContainer>
  ),
}
export default screen
