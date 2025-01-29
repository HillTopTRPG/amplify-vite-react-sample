import { GroupOutlined } from '@ant-design/icons'
import GroupsContents from '@higanbina/components/GroupsContents'
import { screens } from '@higanbina/screens.ts'
import ScreenContainer from '@/components/ScreenContainer.tsx'
import type { Screen } from '@/service'

const spec = { label: 'キャラマイリスト一覧', icon: GroupOutlined }

const screen: Screen = {
  ...spec,
  contents: () => (
    <ScreenContainer {...spec} screens={screens}>
      <GroupsContents />
    </ScreenContainer>
  ),
}
export default screen
