import React from 'react'
import { Flex, Typography } from 'antd'

type ScreenSubTitleProps = {
  title: string
  memo?: React.ReactNode
}
export default function ScreenSubTitle({ title, memo }: ScreenSubTitleProps) {
  return (
    <Flex align="baseline" justify="flex-start" gap={3}>
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        {title}
      </Typography.Title>
      {memo ? (
        <Typography.Text style={{ fontSize: 12 }}>({memo})</Typography.Text>
      ) : null}
    </Flex>
  )
}
