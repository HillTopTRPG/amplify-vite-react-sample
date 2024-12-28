import { Link } from 'react-router-dom'
import { Space } from 'antd'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to the home page</h1>
      <Space direction="vertical" size="middle">
        <Link to="/private/nechronica">Nechronica（ログイン）へ</Link>
        <Link to="/public/nechronica">Nechronica（公開ページ）へ</Link>
        <Link to="/nechronica2">Nechronica2へ</Link>
      </Space>
    </div>
  )
}
