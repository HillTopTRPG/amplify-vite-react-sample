import { type RefObject, useCallback, useMemo, useState } from 'react'
import { useNechronicaContext } from '@Nechronica/context.ts'
import {
  NechronicaDataHelper,
  type NechronicaType,
} from '@Nechronica/ts/NechronicaDataHelper.ts'
import { ImportOutlined } from '@ant-design/icons'
import { Button, type InputRef, Space } from 'antd'
import InputWrap from '@/components/InputWrap.tsx'
import { useScreenContext } from '@/context/screenContext.ts'
import { useUserAttributes } from '@/context/userAttributesContext.ts'

interface Props {
  label: string
  characterType: NechronicaType
  sheetIdInputRef: RefObject<InputRef>
}
export default function AddCharacterInput({
  label,
  characterType,
  sheetIdInputRef,
}: Props) {
  const { scope } = useScreenContext()
  const { createCharacter } = useNechronicaContext()
  const { currentIsMe } = useUserAttributes()
  const [sheetId, setSheetId] = useState('')

  const onCreateCharacter = useCallback(async () => {
    if (!sheetId.trim()) return
    if (!currentIsMe) return
    const sheetData = await NechronicaDataHelper.fetch({
      type: characterType,
      sheetId: sheetId.trim(),
    })
    if (!sheetData) return

    setSheetId('')
    sheetIdInputRef?.current?.blur()
    sheetIdInputRef?.current?.focus()
    createCharacter(sheetData)
  }, [characterType, createCharacter, currentIsMe, sheetId, sheetIdInputRef])

  const elm = useMemo(
    () => (
      <Space.Compact size="large" style={{ alignSelf: 'flex-start' }}>
        <InputWrap
          prefix={<ImportOutlined />}
          value={sheetId}
          placeholder={`追加する${label}のシートID`}
          onPressEnter={onCreateCharacter}
          onChange={(e) => setSheetId(e.target.value)}
          style={{ width: 250 }}
          ref={sheetIdInputRef}
        />
        <Button type="default" onClick={onCreateCharacter}>
          追加
        </Button>
      </Space.Compact>
    ),
    [label, onCreateCharacter, sheetId, sheetIdInputRef],
  )

  return scope === 'public' || !currentIsMe ? null : elm
}
