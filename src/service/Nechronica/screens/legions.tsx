import { RadarChartOutlined } from '@ant-design/icons'
import type { Screen } from '@/service'
import NechronicaCharacterScreenBase from '@/service/Nechronica/screens/NechronicaCharacterScreenBase.tsx'

const type = 'legion'
const label = 'レギオン'
const authorize = true
const viewMenu = true
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
  viewMenu,
  icon,
  contents,
}

export default packed
