import { Image, Flex, Typography, type ImageProps } from 'antd'
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

export default function HomeFooterContents() {
  const theme = useSelector(themeSelector)
  return (
    <Flex
      gap={10}
      align="baseline"
      justify="space-around"
      style={{width: '100%'}}
    >
      <Flex vertical align="flex-start">
        <Typography.Text>開発者</Typography.Text>
        <Flex align="flex-end" gap={4}>
          <Image src={hilltopImg} {...imageProps} />
          <Image
            src={theme === 'dark' ? xLogoWhiteImage : xLogoBlackImage}
            preview={false}
            width={12}
          />
          <Typography.Link style={{fontSize: 12}}>
            @HillTop_TRPG
          </Typography.Link>
        </Flex>
      </Flex>
      <Flex vertical align="flex-start">
        <Typography.Text>Powered by</Typography.Text>
        <Flex gap={4}>
          <TooltipImage title="AWS Amplify" src={amplifyImg}/>
          <TooltipImage title="React" src={reactImg}/>
          <TooltipImage title="Ant Design" src={antdImg}/>
          <TooltipImage title="Redux Toolkit" src={reduxToolkitImg}/>
          <TooltipImage title="x-logo" src={xLogoBlackImage}/>
        </Flex>
      </Flex>
    </Flex>
  )
}
