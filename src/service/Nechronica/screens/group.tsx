import { GroupOutlined } from '@ant-design/icons'
import ScreenContainer from '@/components/layout/ScreenContainer.tsx'
import type { Screen } from '@/service'
import GroupContents from '@/service/Nechronica/components/GroupContents'

const spec = { label: 'キャラクターグループ', icon: GroupOutlined }

const screen: Screen = {
  ...spec,
  containerStyle: (screenSize) =>
    screenSize.viewPortWidth >= 789 && { marginRight: 420 },
  param: 'groupId',
  contents: () => (
    <ScreenContainer {...spec}>
      <GroupContents />
    </ScreenContainer>
  ),
}

export default screen
