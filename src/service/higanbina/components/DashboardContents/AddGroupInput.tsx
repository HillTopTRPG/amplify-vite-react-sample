import { useCallback, useMemo, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { screens } from '@higanbina/screens'
import { Button, Space } from 'antd'
import InputWrap from '@/components/InputWrap.tsx'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'
import { currentIsMeSelector, useAppDispatch, useSelector } from '@/store'
import { createCharacterGroup } from '@/store/commonSlice.ts'

export default function AddGroupInput() {
  const dispatch = useAppDispatch()
  const { scope } = useScreenNavigateInService(screens)
  const currentIsMe = useSelector(currentIsMeSelector)
  const [newGroupName, setNewGroupName] = useState('')

  const onCreateCharacterGroup = useCallback(() => {
    if (!newGroupName.trim()) return
    dispatch(
      createCharacterGroup({
        system: 'nechronica',
        name: newGroupName,
        characterIds: [],
      }),
    )
    setNewGroupName('')
  }, [dispatch, newGroupName])

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
