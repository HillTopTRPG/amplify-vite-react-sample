import { type ReactNode } from 'react'
import { Badge, Card, type CardProps } from 'antd'

export default function PublicCard({
  data,
  cardProps,
  children,
}: {
  data: { public: boolean }
  cardProps: CardProps
  children: ReactNode
}) {
  return (
    <Badge.Ribbon
      placement="start"
      text={data.public ? '公開' : '非公開'}
      color={data.public ? 'blue' : 'orange'}
      style={{ display: 'flex' }}
    >
      <Card
        bordered={false}
        hoverable={false}
        {...cardProps}
        style={{
          width: 180,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow:
            'rgba(127, 127, 127, 0.16) 0px 6px 16px 0px, rgba(127, 127, 127, 0.24) 0px 3px 6px -4px, rgba(127, 127, 127, 0.1) 0px 9px 28px 8px',
          ...cardProps.style,
        }}
        styles={{
          ...cardProps.styles,
          body: {
            padding: 0,
            flexGrow: 1,
            ...cardProps.styles?.body,
          },
        }}
      >
        {children}
      </Card>
    </Badge.Ribbon>
  )
}
