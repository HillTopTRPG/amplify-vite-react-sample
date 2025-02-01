import DashboardContents from '@higanbina/components/DashboardContents'
import TopContents from '@higanbina/components/DashboardContents/TopContents.tsx'
import iconImg from '@higanbina/images/icon.png'
import { screens } from '@higanbina/screens.ts'
import MenuImageIcon from '@/components/MenuImageIcon.tsx'
import ScreenContainer from '@/components/ScreenContainer.tsx'
import type { Screen } from '@/service'

const spec = { label: '彼岸雛', icon: MenuImageIcon(iconImg) }

const screen: Screen = {
  ...spec,
  contents: () => (
    <ScreenContainer {...spec} screens={screens} topContents={<TopContents />}>
      <DashboardContents />
    </ScreenContainer>
  ),
}
export default screen
