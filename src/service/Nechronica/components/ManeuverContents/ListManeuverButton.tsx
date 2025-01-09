import ManeuverButton from '@/service/Nechronica/components/CharacterCard/ManeuverButton.tsx'
import {
  type NechronicaCharacter,
  type NechronicaManeuver,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

interface Props {
  maneuver: NechronicaManeuver
  character: NechronicaCharacter
  selected?: boolean
  onClick?: () => void
}
export default function ListManeuverButton({
  maneuver,
  character,
  selected,
  onClick,
}: Props) {
  const { position, mainClass, subClass } = character.sheetData.basic
  return (
    <ManeuverButton
      maneuver={maneuver}
      position={position}
      mainClass={mainClass}
      subClass={subClass}
      selected={selected}
      onClick={onClick}
    />
  )
}
