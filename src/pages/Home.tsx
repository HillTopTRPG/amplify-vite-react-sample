import { Link } from 'react-router-dom'
import { Anchor, Flex, Space, Typography } from 'antd'

export default function Home() {
  return (
    <Flex style={{ padding: 24 }}>
      <Flex vertical style={{ flexGrow: 1 }}>
        <Typography.Title level={1}>Memento Nexus</Typography.Title>
        <Typography.Title level={2}>永い後日談のネクロニカ</Typography.Title>
        <Space direction="vertical" size="middle">
          <Link to="/private/nechronica">Nechronica（ログイン）へ</Link>
          <Link to="/public/nechronica">Nechronica（公開ページ）へ</Link>
        </Space>
      </Flex>
      <Anchor
        affix={false}
        items={[
          {
            key: '1',
            href: '#anchor-demo-basic',
            title: 'Basic demo',
          },
          {
            key: '2',
            href: '#anchor-demo-static',
            title: 'Static demo',
          },
          {
            key: '3',
            href: '#api',
            title: 'API',
            children: [
              {
                key: '4',
                href: '#anchor-props',
                title: 'Anchor Props',
              },
              {
                key: '5',
                href: '#link-props',
                title: 'Link Props',
              },
            ],
          },
        ]}
      />
    </Flex>
  )
}
