import { type CSSProperties } from 'react'
import { ConfigProvider, Flex, theme, Typography } from 'antd'
import { useCharacterMakeContext } from '../context.ts'
import RoiceInsaneView from './form/RoiceInsaneView.tsx'
import RoiceMemoInput from './form/RoiceMemoInput.tsx'
import RoiceTargetInput from './form/RoiceTargetInput.tsx'
import SelectRoiceId from './form/SelectRoiceId.tsx'
import DeleteConfirmButton from '@/components/DeleteConfirmButton.tsx'
import type { NechronicaRoice } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

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
  const { updateRoice, deleteRoice } = useCharacterMakeContext()
  const setName = (name: string) => updateRoice(index, { ...roice, name })
  const setId = (id: number) => updateRoice(index, { ...roice, id })
  const setMemo = (memo: string) => updateRoice(index, { ...roice, memo })
  const onDeleteRoice = () => {
    onDelete()
    deleteRoice(index)
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
