import { Image } from 'antd'

export default function MenuImageIcon(src: string) {
  return () => (
    <Image
      src={src}
      width={16}
      height={16}
      preview={false}
      style={{
        transform: 'scale(1.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  )
}
