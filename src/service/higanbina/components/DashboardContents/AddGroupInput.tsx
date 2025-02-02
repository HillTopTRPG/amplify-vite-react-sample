import { useCallback, useMemo, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { screens } from '@higanbina/screens'
import { Button, Space } from 'antd'
import InputWrap from '@/components/InputWrap.tsx'
import useCreateCharacterGroup from '@/hooks/gameData/useCreateCharacterGroup.ts'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'
import { useAppSelector } from '@/store'
import { selectCurrentIsMe } from '@/store/userAttributesSlice.ts'

export default function AddGroupInput() {
  const { scope } = useScreenNavigateInService(screens)
  const currentIsMe = useAppSelector(selectCurrentIsMe)
  const [newGroupName, setNewGroupName] = useState('')
  const createCharacterGroup = useCreateCharacterGroup()

  const onCreateCharacterGroup = useCallback(() => {
    if (!newGroupName.trim()) return
    createCharacterGroup({
      system: 'nechronica',
      name: newGroupName,
      characterIds: [],
    })
    setNewGroupName('')
  }, [createCharacterGroup, newGroupName])

  const elm = useMemo(
    () => (
      <Space.Compact size="large">
        <InputWrap
          prefix={<PlusOutlined />}
          value={newGroupName}
          placeholder="追加するグループの名前"
          onPressEnter={onCreateCharacterGroup}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <Button type="default" onClick={onCreateCharacterGroup}>
          追加
        </Button>
      </Space.Compact>
    ),
    [newGroupName, onCreateCharacterGroup],
  )

  return scope === 'public' || !currentIsMe ? null : elm
}
