import ManeuverButton from '@Nechronica/components/CharacterCard/maneuver/ManeuverButton.tsx'
import ManeuverPopoverContents from '@Nechronica/components/CharacterCard/maneuver/ManeuverPopoverContents'
import { type NechronicaManeuver } from '@Nechronica/ts/NechronicaDataHelper.ts'
import { useAppDispatch } from '@/store'
import { updateMakingNechronicaManeuver } from '@/store/nechronicaCharacterMakeSlice.ts'

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
  const dispatch = useAppDispatch()
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
            dispatch(
              updateMakingNechronicaManeuver({
                index,
                data: makeManeuver(maneuver),
              }),
            )
          }
        />
      }
    />
  )
}
