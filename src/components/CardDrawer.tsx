import { type ReactNode } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Drawer, Flex, theme, Typography } from 'antd'

export default function CardDrawer({
  name,
  open,
  onClose,
  children,
}: {
  name: string
  open: boolean | string
  onClose: () => void
  children: ReactNode
}) {
  const { token } = theme.useToken()
  return (
    <Drawer
      getContainer={false}
      open={Boolean(open)}
      placement="top"
      closable={false}
      onClick={(e) => e.stopPropagation()}
      styles={{
        body: {
          padding: 8,
          cursor: 'default',
          backgroundColor: token.colorBgBase,
        },
      }}
    >
      <Flex align="center" justify="flex-end" style={{ marginLeft: 35 }}>
        <Button
          type="text"
          size="small"
          shape="circle"
          icon={<CloseOutlined />}
          onClick={onClose}
        />
      </Flex>
      <Typography.Text ellipsis style={{ flexGrow: 1, fontSize: 10 }}>
        {name}
      </Typography.Text>
      {children}
    </Drawer>
  )
}
