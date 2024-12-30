import { type ReactNode } from 'react'
import { Flex, Typography } from 'antd'

type ScreenSubTitleProps = {
  title: string
  memo?: ReactNode
}
export default function ScreenSubTitle({ title, memo }: ScreenSubTitleProps) {
  return (
    <Flex align="baseline" justify="flex-start" gap={3}>
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        {title}
      </Typography.Title>
      {memo}
    </Flex>
  )
}
