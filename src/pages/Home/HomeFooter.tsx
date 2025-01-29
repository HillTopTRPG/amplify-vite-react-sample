import { type CSSProperties, type RefObject } from 'react'
import {
  Image,
  Flex,
  Typography,
  type ImageProps,
  theme as AntTheme,
  Layout,
  Tabs,
} from 'antd'
import amplifyImg from '@/assets/Arch_AWS-Amplify_64.png'
import antdImg from '@/assets/ant-design-2.svg'
import hilltopImg from '@/assets/icon-HillTop.jpg'
import reactImg from '@/assets/react.svg'
import reduxToolkitImg from '@/assets/redux-toolkit-96.png'
import xLogoBlackImage from '@/assets/x-logo/logo-black.png'
import xLogoWhiteImage from '@/assets/x-logo/logo-white.png'
import SiteMap from '@/pages/Home/SiteMap.tsx'
import TooltipImage from '@/pages/Home/TooltipImage.tsx'
import { themeSelector, useSelector } from '@/store'

const imageProps: ImageProps = {
  preview: false,
  width: 25,
  height: 25,
  style: { backgroundColor: 'white' },
}

interface Props {
  status: number
  refs?: RefObject<HTMLDivElement>[]
}
export default function HomeFooter({ status, refs }: Props) {
  const { token } = AntTheme.useToken()
  const theme = useSelector(themeSelector)

  const height = status === 2 ? 'calc((100vh - 128px) / 3 + 64px)' : 64
  const transition = 'height 500ms ease-in-out'

  const footerStyle: CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    color: theme === 'dark' ? token.colorBgContainer : token.colorBgBlur,
    borderBottom: `solid 1px ${theme === 'dark' ? '#222' : '#e7e7e7'}`,
    padding: '0 0 8px',
    height,
    transition,
    zIndex: 2,
    backgroundColor: status < 2 ? token.colorBgContainer : 'transparent',
    borderTop: '2px solid grey',
  }

  const onHomeNavigate = (refIndex: number) => {
    const ref = refs && refs.length > refIndex ? refs[refIndex] : null
    if (!ref?.current) return
    const id = ref.current.id
    const anchor = id ? `#${id}` : ''
    history.replaceState(null, '', `/${anchor}`)
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Layout.Footer style={footerStyle}>
      <Flex
        vertical
        align="center"
        justify="flex-start"
        gap={8}
        style={{
          width: '100%',
          height,
          transition,
        }}
      >
        <Flex
          gap={10}
          align="flex-start"
          justify="center"
          style={{ width: '100%', backgroundColor: token.colorBgContainer }}
        >
          {refs ? (
            <Tabs
              tabBarStyle={{ marginBottom: 5 }}
              size="middle"
              onChange={(e) => onHomeNavigate(Number(e))}
              activeKey={status.toString()}
              style={{ pointerEvents: 'auto' }}
              items={[
                {
                  key: '0',
                  label: 'トップ',
                },
                {
                  key: '1',
                  label: 'ツール一覧',
                },
                {
                  key: '2',
                  label: 'サイトマップ',
                },
              ]}
            />
          ) : (
            <>
              <Flex vertical align="flex-start">
                <Typography.Text>開発者</Typography.Text>
                <Flex align="flex-end" gap={4}>
                  <Image src={hilltopImg} {...imageProps} />
                  <Image
                    src={theme === 'dark' ? xLogoWhiteImage : xLogoBlackImage}
                    preview={false}
                    width={12}
                  />
                  <Typography.Link style={{ fontSize: 12 }}>
                    @HillTop_TRPG
                  </Typography.Link>
                </Flex>
              </Flex>
              <Flex vertical align="flex-start">
                <Typography.Text>Powered by</Typography.Text>
                <Flex gap={4}>
                  <TooltipImage title="AWS Amplify" src={amplifyImg} />
                  <TooltipImage title="React" src={reactImg} />
                  <TooltipImage title="Ant Design" src={antdImg} />
                  <TooltipImage title="Redux Toolkit" src={reduxToolkitImg} />
                  <TooltipImage title="x-logo" src={xLogoBlackImage} />
                </Flex>
              </Flex>
            </>
          )}
        </Flex>

        {refs && status === 2 ? (
          <SiteMap onHomeNavigate={onHomeNavigate} />
        ) : null}
      </Flex>
    </Layout.Footer>
  )
}
