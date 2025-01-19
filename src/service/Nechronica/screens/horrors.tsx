import CharacterTypeScreen from '@Nechronica/components/CharacterTypeScreen'
import horrorImg from '@Nechronica/images/type/horror.png'
import MenuImageIcon from '@/components/MenuImageIcon.tsx'
import type { Screen } from '@/service'

const spec = { label: 'ホラー', icon: MenuImageIcon(horrorImg) }

const screen: Screen = {
  ...spec,
  containerStyle: (screenSize) =>
    screenSize.viewPortWidth >= 789 && { marginRight: 420 },
  contents: () => <CharacterTypeScreen characterType="horror" {...spec} />,
}
export default screen
