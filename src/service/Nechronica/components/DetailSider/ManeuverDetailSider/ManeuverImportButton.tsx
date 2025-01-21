import { useCallback, useMemo } from 'react'
import { useCharacterMakeContext } from '@Nechronica/components/BuildContents/context.ts'
import { BuildOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { cloneDeep } from 'lodash-es'
import {
  selectedManeuverInfosSelector,
  useAppDispatch,
  useSelector,
} from '@/store'
import { setSelectedManeuverInfos } from '@/store/nechronicaSlice.ts'

export default function ManeuverImportButton() {
  const dispatch = useAppDispatch()
  const selectedManeuverInfos = useSelector(selectedManeuverInfosSelector)
  const { setManeuvers } = useCharacterMakeContext()
  const [messageApi, contextHolder] = message.useMessage()

  const onClick = useCallback(() => {
    setManeuvers((prev) => [
      ...prev,
      ...selectedManeuverInfos.map((info) => cloneDeep(info.maneuver)),
    ])
    messageApi
      .info(`${selectedManeuverInfos.length}個のマニューバのコピー完了`)
      .then()
    dispatch(setSelectedManeuverInfos([]))
  }, [dispatch, messageApi, selectedManeuverInfos, setManeuvers])

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
