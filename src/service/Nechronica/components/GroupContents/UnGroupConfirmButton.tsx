import { Button, Popconfirm } from 'antd'

export default function UnGroupConfirmButton({
  name,
  onConfirm,
}: {
  name: string
  onConfirm?: () => void
}) {
  return (
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
  )
}
