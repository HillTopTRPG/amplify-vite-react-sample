import ManeuverButton from '@higanbina/components/CharacterCard/maneuver/ManeuverButton.tsx'
import ManeuverPopoverContents from '@higanbina/components/CharacterCard/maneuver/ManeuverPopoverContents'
import {
  selectedManeuverInfosSelector,
  useAppDispatch,
  useSelector,
} from '@/store'
import {
  addSelectedManeuverInfo,
  type ManeuverInfo,
  removeSelectedManeuverInfo,
} from '@/store/nechronicaSlice.ts'

interface Props {
  maneuverInfo: ManeuverInfo
}
export default function ListManeuverButton({ maneuverInfo }: Props) {
  const dispatch = useAppDispatch()
  const selectedManeuverInfos = useSelector(selectedManeuverInfosSelector)
  const { position, mainClass, subClass } =
    maneuverInfo.character.sheetData.basic
  const selected = selectedManeuverInfos.some(
    (d) =>
      `${d.character.id}-${d.maneuverIndex}` ===
      `${maneuverInfo.character.id}-${maneuverInfo.maneuverIndex}`,
  )
  return (
    <ManeuverButton
      maneuver={maneuverInfo.maneuver}
      hoverContent={
        <ManeuverPopoverContents
          type="hover"
          maneuver={maneuverInfo.maneuver}
        />
      }
      clickContent={
        <ManeuverPopoverContents
          type="click"
          maneuver={maneuverInfo.maneuver}
        />
      }
      position={position}
      mainClass={mainClass}
      subClass={subClass}
      selected={selected}
      onClick={() => {
        if (
          selectedManeuverInfos.find(
            (d) =>
              `${d.character.id}-${d.maneuverIndex}` ===
              `${maneuverInfo.character.id}-${maneuverInfo.maneuverIndex}`,
          )
        ) {
          dispatch(removeSelectedManeuverInfo(maneuverInfo))
        } else {
          dispatch(addSelectedManeuverInfo(maneuverInfo))
        }
      }}
    />
  )
}
