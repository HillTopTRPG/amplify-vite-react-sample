import ManeuverButton from '@/service/Nechronica/components/CharacterCard/maneuver/ManeuverButton.tsx'
import ManeuverPopoverContents from '@/service/Nechronica/components/CharacterCard/maneuver/ManeuverPopoverContents'
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
      hoverContent={
        <ManeuverPopoverContents type="hover" maneuver={maneuver} />
      }
      clickContent={
        <ManeuverPopoverContents type="click" maneuver={maneuver} />
      }
      position={position}
      mainClass={mainClass}
      subClass={subClass}
      selected={selected}
      onClick={onClick}
    />
  )
}
