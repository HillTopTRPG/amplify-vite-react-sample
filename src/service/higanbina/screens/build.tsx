import { BuildOutlined } from '@ant-design/icons'
import BuildContents from '@higanbina/components/BuildContents'
import { screens } from '@higanbina/screens.ts'
import ScreenContainer from '@/components/ScreenContainer.tsx'
import type { Screen } from '@/service'

const spec = { label: 'キャラクタービルド', icon: BuildOutlined }

const screen: Screen = {
  ...spec,
  containerStyle: (screenSize) =>
    screenSize.viewPortWidth >= 789 && { marginRight: 420 },
  contents: () => (
    <ScreenContainer {...spec} screens={screens}>
      <BuildContents />
    </ScreenContainer>
  ),
}

export default screen
