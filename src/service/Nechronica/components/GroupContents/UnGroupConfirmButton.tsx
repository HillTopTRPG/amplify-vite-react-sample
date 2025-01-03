import { useMemo } from 'react'
import { Button, Popconfirm } from 'antd'

interface Props {
  name: string
  onConfirm?: () => void
}
export default function UnGroupConfirmButton({ name, onConfirm }: Props) {
  return useMemo(
    () => (
      <Popconfirm
        title={`${name}をグループから除外します。`}
        description="この操作は元に戻せません。"
        onConfirm={onConfirm}
        trigger="click"
      >
        <Button type="text" danger>
          除外
        </Button>
      </Popconfirm>
    ),
    [name, onConfirm],
  )
}
