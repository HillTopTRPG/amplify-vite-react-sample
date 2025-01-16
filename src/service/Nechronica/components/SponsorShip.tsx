import { Flex, Image, Typography } from 'antd'
import bannerImg from '../images/banner.png'

export default function SponsorShip() {
  return (
    <Flex vertical style={{ marginBottom: 16 }} align="center">
      協賛者紹介
      <a
        href="https://kosaka-shop.booth.pm/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Flex
          vertical
          align="center"
          gap={6}
          style={{
            marginBottom: 16,
            padding: 16,
            border: '1px solid #ccc',
            borderRadius: 30,
          }}
        >
          <Typography.Text style={{ fontSize: 12 }}>
            【Waddlefy専用アイコンの作成】
          </Typography.Text>
          <Image src={bannerImg} preview={false} width={195} />
          <Typography.Text style={{ fontSize: 12 }}>
            自由気ままに素材作成 - BOOTH
          </Typography.Text>
        </Flex>
      </a>
    </Flex>
  )
}
