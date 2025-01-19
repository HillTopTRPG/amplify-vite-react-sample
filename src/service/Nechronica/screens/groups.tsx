import GroupsContents from '@Nechronica/components/GroupsContents'
import { GroupOutlined } from '@ant-design/icons'
import ScreenContainer from '@/components/ScreenContainer.tsx'
import type { Screen } from '@/service'

const spec = { label: 'キャラマイリスト一覧', icon: GroupOutlined }

const screen: Screen = {
  ...spec,
  contents: () => (
    <ScreenContainer {...spec}>
      <GroupsContents />
    </ScreenContainer>
  ),
}
export default screen
