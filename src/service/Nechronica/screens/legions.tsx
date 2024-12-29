import { RadarChartOutlined } from '@ant-design/icons'
import type { Screen } from '@/service'
import NechronicaCharacterScreenBase from '@/service/Nechronica/screens/NechronicaCharacterScreenBase.tsx'

const spec = { label: 'レギオン', icon: RadarChartOutlined }

const screen: Screen = {
  ...spec,
  contents: () => (
    <NechronicaCharacterScreenBase characterType={'legion'} {...spec} />
  ),
}
export default screen
