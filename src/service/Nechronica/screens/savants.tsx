import { RadarChartOutlined } from '@ant-design/icons'
import type { Screen } from '@/service'
import CharacterTypeScreen from '@/service/Nechronica/components/CharacterTypeScreen'

const spec = { label: 'サヴァント', icon: RadarChartOutlined }

const screen: Screen = {
  ...spec,
  contents: () => <CharacterTypeScreen characterType="savant" {...spec} />,
}
export default screen
