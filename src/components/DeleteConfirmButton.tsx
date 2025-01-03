import { useMemo } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'

interface Props {
  name: string
  onConfirm: () => void
}
export default function DeleteConfirmButton({ name, onConfirm }: Props) {
  return useMemo(
    () => (
      <Popconfirm
        title={`${name}を削除します。`}
        description="この操作は元に戻せません。"
        onConfirm={onConfirm}
        trigger="click"
      >
        <Button key={0} type="text" danger icon={<DeleteOutlined />} />
      </Popconfirm>
    ),
    [name, onConfirm],
  )
}
