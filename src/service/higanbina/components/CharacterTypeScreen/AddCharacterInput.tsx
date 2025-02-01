import { type RefObject, useCallback, useMemo, useState } from 'react'
import { ImportOutlined } from '@ant-design/icons'
import { screens } from '@higanbina/screens'
import {
  NechronicaDataHelper,
  type NechronicaType,
} from '@higanbina/ts/NechronicaDataHelper.ts'
import { Button, type InputRef, Space } from 'antd'
import InputWrap from '@/components/InputWrap.tsx'
import useCreateNechronicaCharacter from '@/hooks/gameData/useCreateNechronicaCharacter.ts'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'
import { useAppSelector } from '@/store'
import { selectCurrentIsMe } from '@/store/userAttributesSlice.ts'

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
  const { scope } = useScreenNavigateInService(screens)
  const currentIsMe = useAppSelector(selectCurrentIsMe)
  const [sheetId, setSheetId] = useState('')
  const createNechronicaCharacter = useCreateNechronicaCharacter()

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
    createNechronicaCharacter(sheetData)
  }, [
    characterType,
    createNechronicaCharacter,
    currentIsMe,
    sheetId,
    sheetIdInputRef,
  ])

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
