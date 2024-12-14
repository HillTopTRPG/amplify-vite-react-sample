import { useState } from 'react'
import { Flex, Input, Typography } from 'antd'
import {
  type Nechronica,
  NechronicaDataHelper,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import { parseIntOrNull } from '@/service/common/PrimaryDataUtility.ts'

export default function InputSheetId({
  onFetchData,
}: {
  onFetchData: (value: Nechronica) => void
}) {
  const [otpValue, setOtpValue] = useState('')
  const onInputSheetId = (id: string[]) => {
    setOtpValue(parseIntOrNull(id.join(''))?.toString() || '')
  }

  const onChange = async (sheetId: string) => {
    const url = `https://charasheet.vampire-blood.net/${sheetId}`
    const helper = new NechronicaDataHelper(sheetId, url, (s) => s)
    if (!helper.isThis()) return
    const data = (await helper.getData())?.data
    if (!data) return
    setOtpValue('')
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
      />
    </Flex>
  )
}
