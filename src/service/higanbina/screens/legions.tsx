import CharacterTypeScreen from '@higanbina/components/CharacterTypeScreen'
import legionImg from '@higanbina/images/type/legion.png'
import MenuImageIcon from '@/components/MenuImageIcon.tsx'
import type { Screen } from '@/service'

const spec = { label: 'レギオン', icon: MenuImageIcon(legionImg) }

const screen: Screen = {
  ...spec,
  containerStyle: (screenSize) =>
    screenSize.viewPortWidth >= 789 && { marginRight: 420 },
  contents: () => <CharacterTypeScreen characterType="legion" {...spec} />,
}
export default screen
