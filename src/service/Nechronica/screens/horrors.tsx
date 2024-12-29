import { RadarChartOutlined } from '@ant-design/icons'
import type { Screen } from '@/service'
import NechronicaCharacterScreenBase from '@/service/Nechronica/screens/NechronicaCharacterScreenBase.tsx'

const spec = { label: 'ホラー', icon: RadarChartOutlined }

const screen: Omit<Screen, 'authorize'> = {
  ...spec,
  contents: () => (
    <NechronicaCharacterScreenBase characterType={'horror'} {...spec} />
  ),
}
export default screen
