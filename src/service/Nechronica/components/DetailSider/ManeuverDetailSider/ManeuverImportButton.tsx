import { BuildOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export default function ManeuverImportButton() {
  return (
    <Button style={{ marginLeft: 8, marginTop: 8 }}>
      <BuildOutlined />
      選択マニューバをビルド画面に取り込む
    </Button>
  )
}
