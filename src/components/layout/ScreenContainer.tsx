import React, { forwardRef, type ReactNode, type Ref } from 'react'
import { Flex, Space, theme, Typography } from 'antd'
import { useMediaQuery } from 'react-responsive'
import { MEDIA_QUERY } from '@/const/style.ts'

type ComponentProps = {
  title: string
  icon: React.FC
  children?: ReactNode
}
function component(
  { title, icon, children }: ComponentProps,
  ref: Ref<HTMLDivElement>,
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isMobile = useMediaQuery(MEDIA_QUERY.MOBILE)
  const { token } = theme.useToken()

  return (
    <Flex
      vertical
      className="screen-container"
      style={{
        overflowY: 'auto',
        padding: '24px 16px',
        boxSizing: 'border-box',
        backgroundColor: token.colorBgContainer,
        minHeight: 'calc(100vh - 48px)',
        maxHeight: 'calc(100vh - 48px)',
      }}
      ref={ref}
    >
      <Typography.Title level={3} style={{ marginTop: -12 }}>
        <Space>
          {isMobile ? React.createElement(icon) : null}
          {title}
        </Space>
      </Typography.Title>
      {children}
    </Flex>
  )
}
const ScreenContainer = forwardRef<HTMLDivElement, ComponentProps>(component)
export default ScreenContainer
