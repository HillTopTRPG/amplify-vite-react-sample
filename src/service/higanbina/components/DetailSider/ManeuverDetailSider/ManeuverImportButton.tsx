import { useCallback, useMemo } from 'react'
import { BuildOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  selectSelectedManeuverInfos,
  setSelectedManeuverInfos,
  addMakingManeuver,
} from '@/store/nechronicaSlice.ts'

export default function ManeuverImportButton() {
  const dispatch = useAppDispatch()
  const selectedManeuverInfos = useAppSelector(selectSelectedManeuverInfos)
  const [messageApi, contextHolder] = message.useMessage()

  const onClick = useCallback(() => {
    selectedManeuverInfos.forEach((info) => {
      dispatch(addMakingManeuver(structuredClone(info.maneuver)))
    })
    messageApi
      .info(`${selectedManeuverInfos.length}個のマニューバのコピー完了`)
      .then()
    dispatch(setSelectedManeuverInfos([]))
  }, [dispatch, messageApi, selectedManeuverInfos])

  return useMemo(
    () => (
      <Button
        style={{ marginLeft: 8, marginTop: 8, alignSelf: 'flex-start' }}
        onClick={onClick}
      >
        {contextHolder}
        <BuildOutlined />
        選択マニューバをビルド画面にコピー
      </Button>
    ),
    [contextHolder, onClick],
  )
}
