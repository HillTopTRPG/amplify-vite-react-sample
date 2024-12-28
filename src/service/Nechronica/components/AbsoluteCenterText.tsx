import { Typography } from 'antd'

export default function AbsoluteCenterText({ text }: { text: string }) {
  return (
    <Typography.Text
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: 'auto',
        whiteSpace: 'nowrap',
        transform: 'translate(-50%, -50%)',
        fontSize: 20,
        borderRadius: 10,
        zIndex: 1,
      }}
    >
      {text}
    </Typography.Text>
  )
}
