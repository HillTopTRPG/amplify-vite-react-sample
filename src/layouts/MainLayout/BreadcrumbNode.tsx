import React from 'react'
import { Typography } from 'antd'
import { type Screen } from '@/service'

interface Props {
  screen: Screen
  onClick?: () => void
}
export default function BreadcrumbNode({ screen, onClick }: Props) {
  return (
    <Typography.Link onClick={onClick} style={{ cursor: 'inherit' }}>
      {React.createElement(screen.icon)}
      <span style={{ marginLeft: 8 }}>{screen.label}</span>
    </Typography.Link>
  )
}
