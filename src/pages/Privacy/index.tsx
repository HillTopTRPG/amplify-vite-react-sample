import { Fragment } from 'react'
import { Flex, Typography } from 'antd'
import privacy from './privacy.json'
import hilltopImg from '@/assets/icon-HillTop.jpg'
import xLogoBlackImage from '@/assets/x-logo/logo-black.png'
import xLogoWhiteImage from '@/assets/x-logo/logo-white.png'
import useScreenSize from '@/hooks/useScreenSize.ts'
import HomeLayout from '@/layouts/HomeLayout'
import HomeFooter from '@/pages/Home/HomeFooter.tsx'
import { useAppSelector } from '@/store'
import { selectTheme } from '@/store/themeSlice.ts'

export default function Privacy() {
  const themeType = useAppSelector(selectTheme)
  const { isMobile } = useScreenSize(false)
  const titleLevel = isMobile ? 3 : 2
  const subtitleLevel = isMobile ? 4 : 3
  const title = isMobile
    ? 'プライバシーポリシー\n（個人情報保護方針）'
    : 'プライバシーポリシー（個人情報保護方針）'

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
          style={{ minWidth: 300, maxWidth: 800, padding: '20px 20px 0 20px' }}
        >
          {privacy.map(({ label, contents }, idx) => (
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
        <Flex
          align="center"
          gap={4}
          style={{ margin: '0 20px', alignSelf: 'flex-start' }}
        >
          <img
            src={themeType === 'dark' ? xLogoWhiteImage : xLogoBlackImage}
            width={16}
            height={16}
            alt=""
          />
          <Typography.Link
            style={{ fontSize: 16, lineHeight: '16px' }}
            href="https://x.com/HillTop_TRPG"
          >
            @HillTop_TRPG
          </Typography.Link>
          <img
            src={hilltopImg}
            width={32}
            height={32}
            style={{ backgroundColor: 'white' }}
            alt=""
          />
        </Flex>
      </Flex>
    </HomeLayout>
  )
}
