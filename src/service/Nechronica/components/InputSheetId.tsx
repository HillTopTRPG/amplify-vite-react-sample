import { type RefObject, useState } from 'react'
import { Flex, Input, type InputRef, Typography } from 'antd'
import {
  type NechronicaAdditionalData,
  type NechronicaCharacter,
  NechronicaDataHelper,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

export default function InputSheetId({
  additionalData,
  onFetchData,
  inputRef,
}: {
  additionalData: Omit<NechronicaAdditionalData, 'sheetId'>
  onFetchData: (value: Omit<NechronicaCharacter, 'id'>) => void
  inputRef: RefObject<InputRef>
}) {
  const [otpValue, setOtpValue] = useState('')

  const onChange = async (sheetId: string) => {
    const data = await NechronicaDataHelper.fetch({
      ...additionalData,
      sheetId,
    })
    if (!data) return
    setOtpValue('')
    inputRef?.current?.blur()
    inputRef?.current?.focus()
    onFetchData(data)
  }

  return (
    <Flex vertical align="flex-start">
      <Typography.Text>キャラクター保管所のシートID</Typography.Text>
      <Input
        value={otpValue}
        onChange={(e) => onChange(e.target.value)}
        ref={inputRef}
      />
    </Flex>
  )
}
