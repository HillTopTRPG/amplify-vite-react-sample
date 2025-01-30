import { GroupOutlined } from '@ant-design/icons'
import GroupContents from '@higanbina/components/GroupContents'
import { screens } from '@higanbina/screens.ts'
import ScreenContainer from '@/components/ScreenContainer.tsx'
import type { Screen } from '@/service'

const spec = { label: 'キャラマイリスト', icon: GroupOutlined }

const screen: Screen = {
  ...spec,
  containerStyle: (screenSize) =>
    screenSize.viewPortWidth >= 789 && { marginRight: 420 },
  param: 'groupId',
  contents: () => (
    <ScreenContainer {...spec} screens={screens}>
      <GroupContents />
    </ScreenContainer>
  ),
}

export default screen
