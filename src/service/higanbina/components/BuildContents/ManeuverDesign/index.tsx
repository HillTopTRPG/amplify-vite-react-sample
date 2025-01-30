import EditableManeuver from '@higanbina/components/BuildContents/ManeuverDesign/EditableManeuver.tsx'
import { useAppSelector } from '@/store'
import {
  selectMakingCharacterBase,
  selectMakingCharacterManeuverList,
} from '@/store/nechronicaSlice.ts'

export default function ManeuverDesign() {
  const maneuvers = useAppSelector(selectMakingCharacterManeuverList)
  const { position, mainClass, subClass } = useAppSelector(
    selectMakingCharacterBase,
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
