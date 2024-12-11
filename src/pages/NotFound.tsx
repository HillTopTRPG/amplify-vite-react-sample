import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="ページが存在しません。"
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          戻る
        </Button>
      }
    />
  )
}
