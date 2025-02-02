import { DeploymentUnitOutlined } from '@ant-design/icons'
import ManeuverContents from '@higanbina/components/ManeuverContents'
import { screens } from '@higanbina/screens.ts'
import ScreenContainer from '@/components/ScreenContainer.tsx'
import type { Screen } from '@/service'

const spec = { label: 'マニューバ一覧', icon: DeploymentUnitOutlined }

const screen: Screen = {
  ...spec,
  containerStyle: (screenSize) =>
    screenSize.viewPortWidth >= 789 && { marginRight: 336 },
  contents: () => (
    <ScreenContainer {...spec} screens={screens}>
      <ManeuverContents />
    </ScreenContainer>
  ),
}

export default screen
