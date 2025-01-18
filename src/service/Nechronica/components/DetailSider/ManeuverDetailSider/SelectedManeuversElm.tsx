import { Flex, Spin, theme, Typography } from 'antd'
import { clone } from 'lodash-es'
import ManeuverPopoverContents from '@/service/Nechronica/components/CharacterCard/maneuver/ManeuverPopoverContents'
import { type ManeuverInfo } from '@/service/Nechronica/components/ManeuverContents/index.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'

interface Props {
  detailList: ManeuverInfo[]
}
export default function SelectedManeuversElm({ detailList }: Props) {
  const { loading, updateCharacter } = useNechronicaContext()
  const { token } = theme.useToken()

  if (loading) return <Spin size="large" />

  if (detailList.length === 0) {
    return (
      <Flex vertical style={{ padding: '0 10px', width: '100%' }}>
        <Typography.Title
          level={4}
          style={{ color: token.colorTextDescription }}
        >
          マニューバプレビュー
        </Typography.Title>
        <Typography.Text style={{ color: token.colorTextDescription }}>
          選択したマニューバの詳細を表示します。
        </Typography.Text>
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
