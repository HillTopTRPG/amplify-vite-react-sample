import { DashboardOutlined } from '@ant-design/icons'
import NechronicaCharacterScreenBase from '@/service/Nechronica/screens/NechronicaCharacterScreenBase.tsx'

const type = 'doll'
const label = 'ドール'
const authorize = true
const icon = DashboardOutlined
const contents = () => (
  <NechronicaCharacterScreenBase
    characterType={type}
    label={label}
    icon={icon}
  />
)

const packed = {
  label,
  authorize,
  icon,
  contents,
}

export default packed
