import React, { useMemo } from 'react'
import { Flex, Spin, Typography } from 'antd'
import { useScreenContext } from '@/context/screenContext.ts'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'

interface Props {
  label: string
  columns: number
  children: React.ReactNode
}
export default function Style2({ label, columns, children }: Props) {
  const { loading } = useNechronicaContext()
  const { screenSize } = useScreenContext()
  const useColumns =
    screenSize.viewPortWidth < 612 ? Math.min(2, columns) : columns

  return useMemo(
    () => (
      <Flex vertical gap={6}>
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            <Typography.Title level={5} style={{ margin: 0 }}>
              {label}
            </Typography.Title>
            <Flex
              wrap
              style={{ width: useColumns * 200 + (useColumns - 1) * 6 }}
              gap={6}
            >
              {children}
            </Flex>
          </>
        )}
      </Flex>
    ),
    [children, label, loading, useColumns],
  )
}
