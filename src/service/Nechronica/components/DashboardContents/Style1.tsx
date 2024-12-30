import React from 'react'
import { Spin, Typography } from 'antd'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'

type Style1Props = {
  label: string
  height: number
  children: React.ReactNode
}
export default function Style1({ label, height, children }: Style1Props) {
  const { loading } = useNechronicaContext()
  return (
    <div
      style={{
        position: 'relative',
        marginLeft: -10,
        width: 380,
        height: 380,
        marginBottom: height - 380,
      }}
    >
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Typography.Text
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 'auto',
              whiteSpace: 'nowrap',
              transform: 'translate(-50%, -50%)',
              fontSize: 20,
              borderRadius: 10,
              zIndex: 1,
            }}
          >
            {label}
          </Typography.Text>
          {children}
        </>
      )}
    </div>
  )
}
