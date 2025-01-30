import { Image, type ImageProps, Tooltip } from 'antd'

const imageProps: ImageProps = {
  preview: false,
  width: 25,
  height: 25,
  style: { backgroundColor: 'white' },
}

interface Props {
  title: string
  src: string
}
export default function TooltipImage({ title, src }: Props) {
  return (
    <Tooltip title={title}>
      <>
        <Image src={src} {...imageProps} />
      </>
    </Tooltip>
  )
}
