import { BuildOutlined } from '@ant-design/icons'
import ScreenContainer from '@/components/ScreenContainer.tsx'
import type { Screen } from '@/service'
import BuildContents from '@/service/Nechronica/components/BuildContents'

const spec = { label: 'キャラクタービルド', icon: BuildOutlined }

const screen: Screen = {
  ...spec,
  containerStyle: (screenSize) =>
    screenSize.viewPortWidth >= 789 && { marginRight: 420 },
  contents: () => (
    <ScreenContainer {...spec}>
      <BuildContents />
    </ScreenContainer>
  ),
}

export default screen
