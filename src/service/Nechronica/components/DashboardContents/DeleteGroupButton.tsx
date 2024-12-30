import { DeleteOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import { type CharacterGroup } from '@/service'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'

export default function DeleteGroupButton({
  group,
}: {
  group: CharacterGroup
}) {
  const { deleteCharacterGroup } = useNechronicaContext()
  return (
    <Popconfirm
      title={`${group.name}を削除します。`}
      description="この操作は元に戻せません。"
      onConfirm={() => deleteCharacterGroup(group.id)}
      trigger="click"
    >
      <Button key={0} type="text" danger icon={<DeleteOutlined />} />
    </Popconfirm>
  )
}
