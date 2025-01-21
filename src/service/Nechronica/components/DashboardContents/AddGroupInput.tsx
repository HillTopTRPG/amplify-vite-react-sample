import { useCallback, useMemo, useState } from 'react'
import { useNechronicaContext } from '@Nechronica/context.ts'
import { screens } from '@Nechronica/screens'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import InputWrap from '@/components/InputWrap.tsx'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'
import { currentIsMeSelector, useSelector } from '@/store'

export default function AddGroupInput() {
  const { scope } = useScreenNavigateInService(screens)
  const { createCharacterGroup } = useNechronicaContext()
  const currentIsMe = useSelector(currentIsMeSelector)
  const [newGroupName, setNewGroupName] = useState('')

  const onCreateCharacterGroup = useCallback(() => {
    if (!newGroupName.trim()) return
    createCharacterGroup({
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
