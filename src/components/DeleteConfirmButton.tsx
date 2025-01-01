import { DeleteOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'

export default function DeleteConfirmButton({
  name,
  onConfirm,
}: {
  name: string
  onConfirm: () => void
}) {
  return (
    <Popconfirm
      title={`${name}を削除します。`}
      description="この操作は元に戻せません。"
      onConfirm={onConfirm}
      trigger="click"
    >
      <Button key={0} type="text" danger icon={<DeleteOutlined />} />
    </Popconfirm>
  )
}
