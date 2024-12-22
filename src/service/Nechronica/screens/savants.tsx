import { DashboardOutlined } from '@ant-design/icons'
import NechronicaCharacterScreenBase from '@/service/Nechronica/screens/NechronicaCharacterScreenBase.tsx'

const type = 'savant'
const label = 'サヴァント'
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
