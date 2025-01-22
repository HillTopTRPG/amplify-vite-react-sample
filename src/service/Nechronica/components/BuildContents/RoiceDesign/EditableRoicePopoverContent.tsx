import { type CSSProperties } from 'react'
import type { NechronicaRoice } from '@Nechronica/ts/NechronicaDataHelper.ts'
import { ConfigProvider, Flex, theme, Typography } from 'antd'
import RoiceInsaneView from './form/RoiceInsaneView.tsx'
import RoiceMemoInput from './form/RoiceMemoInput.tsx'
import RoiceTargetInput from './form/RoiceTargetInput.tsx'
import SelectRoiceId from './form/SelectRoiceId.tsx'
import DeleteConfirmButton from '@/components/DeleteConfirmButton.tsx'
import { useAppDispatch } from '@/store'
import {
  deleteMakingRoice,
  updateMakingRoice,
} from '@/store/nechronicaSlice.ts'

const containerStyle: CSSProperties = {
  width: 320,
  borderRadius: 8,
  fontSize: 12,
  padding: 8,
  alignItems: 'flex-start',
}

interface Props {
  roice: NechronicaRoice
  index: number
  onDelete: () => void
}
export default function EditableRoicePopoverContent({
  roice,
  index,
  onDelete,
}: Props) {
  const { token } = theme.useToken()
  const dispatch = useAppDispatch()
  const setName = (name: string) =>
    dispatch(updateMakingRoice({ index, data: { ...roice, name } }))
  const setId = (id: number) =>
    dispatch(updateMakingRoice({ index, data: { ...roice, id } }))
  const setMemo = (memo: string) =>
    dispatch(updateMakingRoice({ index, data: { ...roice, memo } }))
  const onDeleteRoice = () => {
    onDelete()
    dispatch(deleteMakingRoice(index))
  }
  return (
    <Flex vertical style={containerStyle} gap={8}>
      <Typography.Title level={5} style={{ margin: 0 }}>
        未練の編集
      </Typography.Title>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              colorBorder: token.colorBorderBg,
            },
            Input: {
              colorBorder: token.colorBorderBg,
            },
          },
        }}
      >
        <RoiceTargetInput value={roice.name} onChange={setName} />
        <SelectRoiceId value={roice.id} onChange={setId} />
        <RoiceInsaneView roiceId={roice.id} />
        <RoiceMemoInput value={roice.memo} onChange={setMemo} />
        <DeleteConfirmButton
          name={roice.name}
          onConfirm={onDeleteRoice}
          style={{ alignSelf: 'flex-end' }}
        />
      </ConfigProvider>
    </Flex>
  )
}
