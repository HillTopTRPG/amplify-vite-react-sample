import { UserOutlined } from '@ant-design/icons'
import UserContents from '@higanbina/components/UserContents'
import { screens } from '@higanbina/screens.ts'
import ScreenContainer from '@/components/ScreenContainer.tsx'
import type { Screen } from '@/service'

const spec = { label: 'プロフィール', icon: UserOutlined }

const screen: Screen = {
  ...spec,
  hideMenu: true,
  contents: () => (
    <ScreenContainer {...spec} screens={screens}>
      <UserContents />
    </ScreenContainer>
  ),
}
export default screen
