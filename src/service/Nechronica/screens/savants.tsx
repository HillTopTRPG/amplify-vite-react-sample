import CharacterTypeScreen from '@Nechronica/components/CharacterTypeScreen'
import { RadarChartOutlined } from '@ant-design/icons'
import type { Screen } from '@/service'

const spec = { label: 'サヴァント', icon: RadarChartOutlined }

const screen: Screen = {
  ...spec,
  containerStyle: (screenSize) =>
    screenSize.viewPortWidth >= 789 && { marginRight: 420 },
  contents: () => <CharacterTypeScreen characterType="savant" {...spec} />,
}
export default screen
