import { RadarChartOutlined } from '@ant-design/icons'
import type { Screen } from '@/service'
import CharacterTypeScreen from '@/service/Nechronica/components/CharacterTypeScreen'

const spec = { label: 'レギオン', icon: RadarChartOutlined }

const screen: Screen = {
  ...spec,
  contents: () => <CharacterTypeScreen characterType="legion" {...spec} />,
}
export default screen
