import React from 'react'
import { Space, Typography } from 'antd'
import { useMediaQuery } from 'react-responsive'
import { MEDIA_QUERY } from '@/const/style.ts'

export default function ScreenContainer({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.FC
  children?: React.JSX.Element | React.JSX.Element[]
}) {
  const isMobile = useMediaQuery(MEDIA_QUERY.MOBILE)
  return (
    <>
      <Typography.Title level={3} style={{ marginTop: -12 }}>
        <Space>
          {isMobile ? React.createElement(icon) : null}
          {title}
        </Space>
      </Typography.Title>
      {children}
    </>
  )
}
