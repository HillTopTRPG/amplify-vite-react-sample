import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import { useScreenContext } from '@/context/screenContext.ts'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'

export default function AddGroupInput() {
  const { scope } = useScreenContext()
  const { createCharacterGroup } = useNechronicaContext()
  // 入力の変換モードの管理
  const [composition, setComposition] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')

  const onCreateCharacterGroup = () => {
    if (composition) return
    if (!newGroupName.trim()) return
    createCharacterGroup({
      name: newGroupName,
      characterIds: [],
    })
    setNewGroupName('')
  }

  if (scope === 'private') return null
  return (
    <Space.Compact size="large">
      <Input
        prefix={<PlusOutlined />}
        value={newGroupName}
        placeholder="追加するグループの名前"
        onPressEnter={onCreateCharacterGroup}
        onCompositionStart={() => setComposition(true)}
        onCompositionEnd={() => setComposition(false)}
        onChange={(e) => setNewGroupName(e.target.value)}
      />
      <Button type="default" onClick={onCreateCharacterGroup}>
        追加
      </Button>
    </Space.Compact>
  )
}
