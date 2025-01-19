import ManeuverButton from '@Nechronica/components/CharacterCard/maneuver/ManeuverButton.tsx'
import ManeuverPopoverContents from '@Nechronica/components/CharacterCard/maneuver/ManeuverPopoverContents'
import { type ManeuverInfo, useNechronicaContext } from '@Nechronica/context.ts'

interface Props {
  maneuverInfo: ManeuverInfo
}
export default function ListManeuverButton({ maneuverInfo }: Props) {
  const { selectedManeuverInfos, setSelectedManeuverInfos } =
    useNechronicaContext()
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
          setSelectedManeuverInfos((prev) =>
            prev.filter(
              (d) =>
                `${d.character.id}-${d.maneuverIndex}` !==
                `${maneuverInfo.character.id}-${maneuverInfo.maneuverIndex}`,
            ),
          )
        } else {
          setSelectedManeuverInfos((prev) => [maneuverInfo, ...prev])
        }
      }}
    />
  )
}
