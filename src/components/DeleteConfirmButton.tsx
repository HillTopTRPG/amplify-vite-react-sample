import { type CSSProperties, useMemo } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'

interface Props {
  name: string
  onConfirm: () => void
  style?: CSSProperties
}
export default function DeleteConfirmButton({ name, onConfirm, style }: Props) {
  return useMemo(
    () => (
      <Popconfirm
        title={`${name}を削除します。`}
        description="この操作は元に戻せません。"
        onConfirm={onConfirm}
        trigger="click"
      >
        <Button
          key={0}
          type="text"
          danger
          icon={<DeleteOutlined />}
          style={{ fontSize: 'inherit', ...style }}
        >
          削除
        </Button>
      </Popconfirm>
    ),
    [name, onConfirm, style],
  )
}
