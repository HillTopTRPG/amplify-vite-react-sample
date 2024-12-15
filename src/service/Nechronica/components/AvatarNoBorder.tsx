import { Avatar, type GetProps } from 'antd'

type AvatarNoBorderProps = GetProps<typeof Avatar>
export default function AvatarNoBorder(props: AvatarNoBorderProps) {
  return (
    <Avatar
      {...props}
      shape="square"
      style={{ ...props.style, border: 'none' }}
    />
  )
}
