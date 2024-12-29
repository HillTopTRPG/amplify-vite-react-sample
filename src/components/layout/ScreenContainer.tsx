import React, { forwardRef, type ReactNode, type Ref } from 'react'
import { Flex, Space, theme, Typography } from 'antd'
import { useMediaQuery } from 'react-responsive'
import { MEDIA_QUERY } from '@/const/style.ts'

type ComponentProps = {
  label: string
  icon: React.FC
  children?: ReactNode
}
function component(
  { label, icon, children }: ComponentProps,
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
        padding: '24px 16px',
        boxSizing: 'border-box',
        backgroundColor: token.colorBgContainer,
      }}
      ref={ref}
    >
      <Typography.Title level={3} style={{ marginTop: -12 }}>
        <Space>
          {isMobile ? React.createElement(icon) : null}
          {label}
        </Space>
      </Typography.Title>
      {children}
    </Flex>
  )
}
const ScreenContainer = forwardRef<HTMLDivElement, ComponentProps>(component)
export default ScreenContainer
