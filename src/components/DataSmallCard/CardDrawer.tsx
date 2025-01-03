import { type ReactNode } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Drawer, Flex, theme, Typography } from 'antd'
import { type SmallCardData } from '@/components/DataSmallCard/index.tsx'

export default function CardDrawer({
  data,
  open,
  onClose,
  children,
}: {
  data: SmallCardData
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
        wrapper: {
          height: '100%',
        },
        body: {
          padding: 8,
          cursor: 'default',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: token.colorBgBase,
        },
        content: {
          height: '100%',
        },
      }}
    >
      <Flex
        align="center"
        justify="flex-end"
        style={{ marginLeft: data.public ? 35 : 50, marginBottom: 6 }}
      >
        <Typography.Text
          ellipsis
          type="success"
          style={{ flexGrow: 1, fontSize: 12 }}
        >
          {data.name}
        </Typography.Text>
        <Button
          type="text"
          size="small"
          shape="circle"
          icon={<CloseOutlined />}
          onClick={onClose}
        />
      </Flex>
      {children}
    </Drawer>
  )
}
