import { Flex, List } from 'antd'
import AvatarNoBorder from '@/service/Nechronica/components/AvatarNoBorder.tsx'
import ManeuverButton from '@/service/Nechronica/components/ManeuverButton.tsx'
import {
  type NechronicaBasic,
  type NechronicaManeuver,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

export default function PartsListItem({
  maneuverList,
  src,
  parts,
  basic,
}: {
  maneuverList: NechronicaManeuver[]
  src: string
  parts: number[]
  basic: NechronicaBasic
}) {
  return (
    <List.Item style={{ padding: '6px 0' }}>
      <Flex align="flex-start" justify="flex-start" gap={7}>
        <AvatarNoBorder src={src} size={64} style={{ minWidth: 64 }} />
        <Flex
          align="center"
          justify="flex-start"
          gap={7}
          wrap
          style={{ flexGrow: 1 }}
        >
          {maneuverList
            .filter((maneuver) => parts.includes(maneuver.parts))
            .map((maneuver, index) => (
              <ManeuverButton key={index} maneuver={maneuver} basic={basic} />
            ))}
        </Flex>
      </Flex>
    </List.Item>
  )
}
