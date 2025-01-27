import { type CSSProperties, type RefObject } from 'react'
import {
  BarsOutlined,
  ClusterOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import {
  Image,
  Flex,
  Typography,
  type ImageProps,
  theme as AntTheme,
  Layout,
  Steps,
  Descriptions,
  type DescriptionsProps,
} from 'antd'
import amplifyImg from '@/assets/Arch_AWS-Amplify_64.png'
import antdImg from '@/assets/ant-design-2.svg'
import hilltopImg from '@/assets/icon-HillTop.jpg'
import reactImg from '@/assets/react.svg'
import reduxToolkitImg from '@/assets/redux-toolkit-96.png'
import xLogoBlackImage from '@/assets/x-logo/logo-black.png'
import xLogoWhiteImage from '@/assets/x-logo/logo-white.png'
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
export default function HomeFooterContents({ status, refs }: Props) {
  const theme = useSelector(themeSelector)
  const { token } = AntTheme.useToken()

  const height = status === 2 ? 'calc((100vh - 128px) / 4 + 64px)' : 64

  const footerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    gap: 18,
    color: theme === 'dark' ? token.colorBgContainer : token.colorBgBlur,
    borderBottom: `solid 1px ${theme === 'dark' ? '#222' : '#e7e7e7'}`,
    padding: '3px 20px 8px 20px',
    height,
  }

  const onChange = (value: number) => {
    const ref = refs && refs.length > value ? refs[value] : null
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '',
      children: <Typography.Link>利用規約</Typography.Link>,
    },
    {
      key: '2',
      label: '',
      children: <Typography.Link>プライバシーポリシー</Typography.Link>,
    },
    {
      key: '3',
      label: '',
      children: <Typography.Link>ヘルプ</Typography.Link>,
    },
    {
      key: '4',
      label: '',
      children: <Typography.Link>問い合わせ先</Typography.Link>,
    },
  ]

  return (
    <Layout.Footer style={footerStyle}>
      <Flex
        gap={10}
        align="baseline"
        justify="space-around"
        style={{
          width: '100%',
          height,
          transition: 'height 500ms ease-in-out',
          fontSize: 12,
        }}
      >
        {refs ? (
          <Steps
            size="small"
            type="navigation"
            current={status}
            onChange={onChange}
            labelPlacement="horizontal"
            style={{ maxWidth: 600 }}
            items={[
              { title: 'Top', icon: <InfoCircleOutlined /> },
              { title: 'ツール', icon: <ClusterOutlined /> },
              { title: 'サイトマップ', icon: <BarsOutlined /> },
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
      <Descriptions title="Site map" items={items} />;
    </Layout.Footer>
  )
}
