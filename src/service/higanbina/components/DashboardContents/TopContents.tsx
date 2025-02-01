import iconImg from '@higanbina/images/icon.png'
import { Avatar, Flex, Typography } from 'antd'
import { theme } from 'antd'
import Rubies from '@/layouts/HomeLayout/Rubies.tsx'
import styles from '@/pages/Home/CustomFont.module.css'

export default function TopContents() {
  const { token } = theme.useToken()
  return (
    <Flex vertical>
      <Flex align="center" gap={8}>
        <Avatar src={iconImg} size={80} />
        <Typography.Title
          level={2}
          className={styles.higanbinaTitleFont}
          style={{ margin: 0 }}
        >
          <Rubies name="彼岸雛" kana="ヒガンビナ" />
        </Typography.Title>
      </Flex>
      <Typography.Text style={{ color: token.colorTextDescription }}>
        永い後日談のネクロニカ専用のパワフルなセッション支援ツール
      </Typography.Text>
    </Flex>
  )
}
