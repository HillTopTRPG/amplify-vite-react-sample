import React, { forwardRef, type ReactNode, type Ref, useMemo } from 'react'
import { Flex, Space, theme, Typography } from 'antd'
import { useMediaQuery } from 'react-responsive'
import { MEDIA_QUERY } from '@/const/style.ts'

type ComponentProps = {
  label: string
  icon: React.FC
  children?: ReactNode
}
/* eslint-disable react-hooks/rules-of-hooks */
function component(
  { label, icon, children }: ComponentProps,
  ref: Ref<HTMLDivElement>,
) {
  const isMobile = useMediaQuery(MEDIA_QUERY.MOBILE)
  const { token } = theme.useToken()

  return useMemo(
    () => (
      <Flex
        vertical
        className="screen-container"
        style={{
          padding: '24px 16px',
          boxSizing: 'border-box',
          backgroundColor: token.colorBgContainer,
          minHeight: '100vh',
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
    ),
    [children, icon, isMobile, label, ref, token.colorBgContainer],
  )
}
/* eslint-enable react-hooks/rules-of-hooks */
const ScreenContainer = forwardRef<HTMLDivElement, ComponentProps>(component)
export default ScreenContainer
