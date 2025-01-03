import { type RefObject, useCallback, useMemo, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Input, type InputRef, Space } from 'antd'
import { useScreenContext } from '@/context/screenContext.ts'
import { useUserAttributes } from '@/context/userAttributesContext.ts'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'
import {
  NechronicaDataHelper,
  type NechronicaType,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

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
  // 入力の変換モードの管理
  const [composition, setComposition] = useState(false)
  const [sheetId, setSheetId] = useState('')

  const onCreateCharacter = useCallback(async () => {
    if (composition) return
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
  }, [
    characterType,
    composition,
    createCharacter,
    currentIsMe,
    sheetId,
    sheetIdInputRef,
  ])

  const elm = useMemo(
    () => (
      <Space.Compact size="large" style={{ alignSelf: 'flex-start' }}>
        <Input
          prefix={<PlusOutlined />}
          value={sheetId}
          placeholder={`追加する${label}のシートID`}
          onPressEnter={onCreateCharacter}
          onCompositionStart={() => setComposition(true)}
          onCompositionEnd={() => setComposition(false)}
          onChange={(e) => setSheetId(e.target.value)}
          style={{ width: 300 }}
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
