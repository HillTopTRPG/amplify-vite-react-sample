import { BuildOutlined } from '@ant-design/icons'
import ScreenContainer from '@/components/ScreenContainer.tsx'
import type { Screen } from '@/service'
import BuildContents from '@/service/Nechronica/components/BuildContents'
import { NechronicaCharacterMakeProvider } from '@/service/Nechronica/components/BuildContents/context.ts'

const spec = { label: 'キャラクタービルド', icon: BuildOutlined }

const screen: Screen = {
  ...spec,
  containerStyle: (screenSize) =>
    screenSize.viewPortWidth >= 789 && { marginRight: 336 },
  contents: () => (
    <ScreenContainer {...spec}>
      <NechronicaCharacterMakeProvider>
        <BuildContents />
      </NechronicaCharacterMakeProvider>
    </ScreenContainer>
  ),
}

export default screen
