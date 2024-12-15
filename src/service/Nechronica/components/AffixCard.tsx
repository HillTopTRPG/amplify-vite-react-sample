import React, { type RefObject } from 'react'
import { Affix, Card, type CardProps, theme } from 'antd'

type AffixCardProps = {
  affixContainer: RefObject<HTMLElement>
  children: React.ReactNode
}
export default function AffixCard({
  affixContainer,
  children,
}: AffixCardProps) {
  const { token } = theme.useToken()
  const cardProps: CardProps = {
    type: 'inner',
    bordered: false,
    styles: { body: { padding: '5px 0 25px 0' } },
    style: {
      borderRadius: 0,
      backgroundColor: 'transparent',
      backgroundImage: `linear-gradient(180deg, ${token.colorBgContainer} calc(100% - 20px), transparent)`,
      boxShadow: 'none',
      marginTop: -1,
    },
  }

  return (
    <Affix target={() => affixContainer.current}>
      <Card {...cardProps}>{children}</Card>
    </Affix>
  )
}
