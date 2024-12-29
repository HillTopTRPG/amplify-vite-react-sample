import { RadarChartOutlined } from '@ant-design/icons'
import type { Screen } from '@/service'
import NechronicaCharacterScreenBase from '@/service/Nechronica/screens/NechronicaCharacterScreenBase.tsx'

const spec = { label: 'サヴァント', icon: RadarChartOutlined }

const screen: Omit<Screen, 'authorize'> = {
  ...spec,
  contents: () => (
    <NechronicaCharacterScreenBase characterType={'savant'} {...spec} />
  ),
}
export default screen
