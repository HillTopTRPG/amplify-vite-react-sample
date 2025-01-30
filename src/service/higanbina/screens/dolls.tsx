import CharacterTypeScreen from '@higanbina/components/CharacterTypeScreen'
import aliceImg from '@higanbina/images/position/alice.png'
import MenuImageIcon from '@/components/MenuImageIcon.tsx'
import type { Screen } from '@/service'

const spec = { label: 'ドール', icon: MenuImageIcon(aliceImg) }

const screen: Screen = {
  ...spec,
  containerStyle: (screenSize) =>
    screenSize.viewPortWidth >= 789 && { marginRight: 420 },
  contents: () => <CharacterTypeScreen characterType="doll" {...spec} />,
}
export default screen
