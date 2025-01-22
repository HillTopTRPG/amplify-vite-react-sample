import EditableManeuver from '@Nechronica/components/BuildContents/ManeuverDesign/EditableManeuver.tsx'
import {
  makingNechronicaCharacterBaseSelector,
  makingNechronicaCharacterManeuverListSelector,
  useSelector,
} from '@/store'

export default function ManeuverDesign() {
  const maneuvers = useSelector(makingNechronicaCharacterManeuverListSelector)
  const { position, mainClass, subClass } = useSelector(
    makingNechronicaCharacterBaseSelector,
  )

  return (
    <>
      {maneuvers.map((maneuver, idx) => (
        <EditableManeuver
          key={idx}
          maneuver={maneuver}
          position={position}
          mainClass={mainClass}
          subClass={subClass}
          index={idx}
        />
      ))}
    </>
  )
}
