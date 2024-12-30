import { Typography } from 'antd'

export default function KeyText({ value }: { value: string }) {
  return (
    <Typography.Text
      style={{
        border: '1px solid #d9d9d9',
        backgroundColor: 'white',
        color: 'black',
        fontSize: 12,
        padding: '0 3px',
        borderRadius: 3,
        userSelect: 'none',
      }}
    >
      {value}
    </Typography.Text>
  )
}
