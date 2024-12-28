import { RadarChartOutlined } from '@ant-design/icons'
import type { Screen } from '@/service'
import NechronicaCharacterScreenBase from '@/service/Nechronica/screens/NechronicaCharacterScreenBase.tsx'

const label = 'レギオン'
const icon = RadarChartOutlined
const contents = () => (
  <NechronicaCharacterScreenBase
    characterType={'legion'}
    label={label}
    icon={icon}
  />
)

const packed: Screen = {
  label,
  authorize: true,
  icon,
  contents,
}

export default packed
