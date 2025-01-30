import { Fragment } from 'react'
import { Flex, Typography } from 'antd'
import rules from './rules.json'
import useScreenSize from '@/hooks/useScreenSize.ts'
import HomeLayout from '@/layouts/HomeLayout'
import HomeFooter from '@/pages/Home/HomeFooter.tsx'

export default function Rules() {
  const { isMobile } = useScreenSize(false)
  const titleLevel = isMobile ? 3 : 2
  const subtitleLevel = isMobile ? 4 : 3
  const title = '利用約款'

  return (
    <HomeLayout footer={<HomeFooter status={0} />}>
      <Flex vertical align="center" style={{ padding: '80px 0' }}>
        <Typography.Title level={titleLevel} style={{ whiteSpace: 'pre-wrap' }}>
          {title}
        </Typography.Title>
        <Flex
          vertical
          align="flex-start"
          justify="flex-start"
          style={{ minWidth: 300, maxWidth: 800, padding: 20 }}
        >
          {rules.map(({ label, contents }, idx) => (
            <Fragment key={idx}>
              <Typography.Title level={subtitleLevel}>{label}</Typography.Title>
              <Typography.Paragraph
                style={{ whiteSpace: 'pre-wrap', fontSize: 17 }}
              >
                {contents.join('\n')}
              </Typography.Paragraph>
            </Fragment>
          ))}
        </Flex>
      </Flex>
    </HomeLayout>
  )
}
