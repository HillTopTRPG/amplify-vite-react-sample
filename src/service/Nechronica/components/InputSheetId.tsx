import { type RefObject, useState } from 'react'
import { Flex, Input, Typography } from 'antd'
import { type OTPRef } from 'antd/es/input/OTP'
import {
  type Nechronica,
  NechronicaDataHelper,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import { parseIntOrNull } from '@/service/common/PrimaryDataUtility.ts'

export default function InputSheetId({
  onFetchData,
  inputRef,
}: {
  onFetchData: (value: Nechronica) => void
  inputRef: RefObject<OTPRef>
}) {
  const [otpValue, setOtpValue] = useState('')
  const onInputSheetId = (id: string[]) => {
    setOtpValue(parseIntOrNull(id.join(''))?.toString() || '')
  }

  const onChange = async (sheetId: string) => {
    const data = await NechronicaDataHelper.fetch(sheetId)
    if (!data) return
    setOtpValue('')
    inputRef.current?.blur()
    inputRef.current?.focus()
    onFetchData(data)
  }

  return (
    <Flex vertical align="flex-start">
      <Typography.Text>キャラクター保管所のシートID</Typography.Text>
      <Input.OTP
        value={otpValue}
        length={7}
        onInput={onInputSheetId}
        onChange={onChange}
        ref={inputRef}
      />
    </Flex>
  )
}
