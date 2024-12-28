import { RadarChartOutlined } from '@ant-design/icons'
import type { Screen } from '@/service'
import NechronicaCharacterScreenBase from '@/service/Nechronica/screens/NechronicaCharacterScreenBase.tsx'

const label = 'ホラー'
const icon = RadarChartOutlined
const contents = () => (
  <NechronicaCharacterScreenBase
    characterType={'horror'}
    label={label}
    icon={icon}
  />
)

const packed: Screen = {
  label,
  authorize: false,
  icon,
  contents,
}

export default packed
