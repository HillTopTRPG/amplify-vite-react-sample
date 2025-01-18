import { Flex, Skeleton, Spin } from 'antd'
import { clone } from 'lodash-es'
import ManeuverPopoverContents from '@/service/Nechronica/components/CharacterCard/maneuver/ManeuverPopoverContents'
import { type ManeuverInfo } from '@/service/Nechronica/components/ManeuverContents/index.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'

interface Props {
  detailList: ManeuverInfo[]
}
export default function SelectedManeuversElm({ detailList }: Props) {
  const { loading, updateCharacter } = useNechronicaContext()
  if (loading) return <Spin size="large" />
  if (detailList.length === 0) {
    return (
      <Flex vertical style={{ padding: '0 10px', width: '100%' }}>
        <Skeleton title paragraph={{ rows: 0 }} />
        <Skeleton round />
      </Flex>
    )
  }
  return detailList.map((info) => {
    return (
      <ManeuverPopoverContents
        key={`${info.character.id}-${info.maneuverIndex}`}
        type="hover"
        maneuver={info.maneuver}
        updateManeuver={(makeManeuver) => {
          const newCharacter = clone(info.character)
          newCharacter.sheetData.maneuverList[info.maneuverIndex] =
            makeManeuver(info.maneuver)
          updateCharacter(newCharacter)
        }}
      />
    )
  })
}
