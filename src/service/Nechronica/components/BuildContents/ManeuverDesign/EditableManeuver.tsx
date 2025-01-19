import { useCharacterMakeContext } from '@Nechronica/components/BuildContents/context.ts'
import ManeuverButton from '@Nechronica/components/CharacterCard/maneuver/ManeuverButton.tsx'
import ManeuverPopoverContents from '@Nechronica/components/CharacterCard/maneuver/ManeuverPopoverContents'
import { type NechronicaManeuver } from '@Nechronica/ts/NechronicaDataHelper.ts'

interface Props {
  maneuver: NechronicaManeuver
  position: number
  mainClass: number
  subClass: number
  index: number
}
export default function EditableManeuver({
  maneuver,
  position,
  mainClass,
  subClass,
  index,
}: Props) {
  const { updateManeuver } = useCharacterMakeContext()
  return (
    <ManeuverButton
      maneuver={maneuver}
      position={position}
      mainClass={mainClass}
      subClass={subClass}
      hoverContent={
        <ManeuverPopoverContents type="hover" maneuver={maneuver} />
      }
      clickContent={
        <ManeuverPopoverContents
          type="click"
          maneuver={maneuver}
          updateManeuver={(makeManeuver) =>
            updateManeuver(index, makeManeuver(maneuver))
          }
        />
      }
    />
  )
}
