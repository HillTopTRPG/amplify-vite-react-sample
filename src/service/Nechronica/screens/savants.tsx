import { RadarChartOutlined } from '@ant-design/icons'
import type { Screen } from '@/service'
import NechronicaCharacterScreenBase from '@/service/Nechronica/screens/NechronicaCharacterScreenBase.tsx'

const type = 'savant'
const label = 'サヴァント'
const authorize = true
const icon = RadarChartOutlined
const contents = () => (
  <NechronicaCharacterScreenBase
    characterType={type}
    label={label}
    icon={icon}
  />
)

const packed: Screen = {
  label,
  authorize,
  icon,
  contents,
}

export default packed
