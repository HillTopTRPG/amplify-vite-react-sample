import { type RefObject, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Divider, Flex, type InputRef } from 'antd'
import BorderlessInput from './BorderlessInput.tsx'
import ScreenSubTitle from './ScreenSubTitle.tsx'
import { useUserAttributes } from '@/context/userAttributesContext.ts'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import {
  NechronicaDataHelper,
  type NechronicaType,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

const SEARCH_INPUT_WIDTH = 370

export default function CharacterIdInput({
  label,
  characterType,
  sheetIdInputRef,
}: {
  label: string
  characterType: NechronicaType
  sheetIdInputRef: RefObject<InputRef>
}) {
  const { createCharacter } = useNechronicaContext()
  const { currentIsMe } = useUserAttributes()
  const [sheetId, setSheetId] = useState('')

  if (!currentIsMe) return null

  return (
    <Flex vertical align="flex-start" style={{ marginTop: 10, gap: 10 }}>
      <ScreenSubTitle title={`${label}登録`} />
      <BorderlessInput
        value={sheetId}
        isAffixed={false}
        width={SEARCH_INPUT_WIDTH}
        icon={<SearchOutlined />}
        placeholder="キャラクター保管所のキャラクターのIDを入力"
        onChange={async (sheetId: string) => {
          setSheetId(sheetId)
          if (!currentIsMe) return
          const sheetData = await NechronicaDataHelper.fetch({
            type: characterType,
            sheetId,
          })
          if (!sheetData) return

          setSheetId('')
          sheetIdInputRef?.current?.blur()
          sheetIdInputRef?.current?.focus()
          createCharacter(sheetData)
        }}
        inputRef={sheetIdInputRef}
      />
      <Divider
        style={{
          marginLeft: 11,
          marginRight: 11,
          width: SEARCH_INPUT_WIDTH - 11 * 2,
          minWidth: 'auto',
        }}
      />
    </Flex>
  )
}
