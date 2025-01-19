import { useCallback, useMemo } from 'react'
import { useCharacterMakeContext } from '@Nechronica/components/BuildContents/context.ts'
import { useNechronicaContext } from '@Nechronica/context.ts'
import { BuildOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { clone } from 'lodash-es'

export default function ManeuverImportButton() {
  const { selectedManeuverInfos, setSelectedManeuverInfos } =
    useNechronicaContext()
  const { setManeuvers } = useCharacterMakeContext()
  const [messageApi, contextHolder] = message.useMessage()

  const onClick = useCallback(() => {
    setManeuvers((prev) => [
      ...prev,
      ...selectedManeuverInfos.map((info) => clone(info.maneuver)),
    ])
    messageApi
      .info(`${selectedManeuverInfos.length}個のマニューバのコピー完了`)
      .then()
    setSelectedManeuverInfos([])
  }, [
    messageApi,
    selectedManeuverInfos,
    setManeuvers,
    setSelectedManeuverInfos,
  ])

  return useMemo(
    () => (
      <Button style={{ marginLeft: 8, marginTop: 8 }} onClick={onClick}>
        {contextHolder}
        <BuildOutlined />
        選択マニューバをビルド画面にコピー
      </Button>
    ),
    [contextHolder, onClick],
  )
}
