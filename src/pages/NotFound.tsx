import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'
import HomeLayout from '@/layouts/HomeLayout'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <HomeLayout hideMenu>
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
    </HomeLayout>
  )
}
