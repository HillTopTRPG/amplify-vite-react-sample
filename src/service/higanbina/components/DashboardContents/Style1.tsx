import React, { type CSSProperties, useMemo } from 'react'
import { Spin, Typography } from 'antd'
import useNechronicaLoading from '@/hooks/gameData/useNechronicaLoading.ts'

const SIZE = 380

const centerPositionStyle: CSSProperties = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: 'auto',
  transform: 'translate(-50%, -50%)',
}

const centerLabelStyle: CSSProperties = {
  ...centerPositionStyle,
  whiteSpace: 'nowrap',
  fontSize: 20,
  borderRadius: 10,
  zIndex: 1,
}

interface Props {
  label: string
  height: number
  children: React.ReactNode
}
export default function Style1({ label, height, children }: Props) {
  const loading = useNechronicaLoading()

  return useMemo(
    () => (
      <div
        style={{
          position: 'relative',
          marginLeft: -10,
          width: SIZE,
          height: SIZE,
          marginBottom: height - SIZE,
        }}
      >
        {loading ? (
          <Spin size="large" style={centerPositionStyle} />
        ) : (
          <>
            <Typography.Text style={centerLabelStyle}>{label}</Typography.Text>
            {children}
          </>
        )}
      </div>
    ),
    [children, height, label, loading],
  )
}
