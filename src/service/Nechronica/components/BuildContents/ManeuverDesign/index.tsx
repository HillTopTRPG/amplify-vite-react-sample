import EditableManeuver from '@/service/Nechronica/components/BuildContents/ManeuverDesign/EditableManeuver.tsx'
import { useCharacterMakeContext } from '@/service/Nechronica/components/BuildContents/context.ts'

export default function ManeuverDesign() {
  const { maneuvers, position, mainClass, subClass } = useCharacterMakeContext()

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
