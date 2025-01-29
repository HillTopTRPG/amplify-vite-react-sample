import CharacterTypeScreen from '@higanbina/components/CharacterTypeScreen'
import savantImg from '@higanbina/images/type/savant.png'
import MenuImageIcon from '@/components/MenuImageIcon.tsx'
import type { Screen } from '@/service'

const spec = { label: 'サヴァント', icon: MenuImageIcon(savantImg) }

const screen: Screen = {
  ...spec,
  containerStyle: (screenSize) =>
    screenSize.viewPortWidth >= 789 && { marginRight: 420 },
  contents: () => <CharacterTypeScreen characterType="savant" {...spec} />,
}
export default screen
