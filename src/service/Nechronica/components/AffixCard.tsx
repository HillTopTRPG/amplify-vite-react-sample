import React, { type RefObject } from 'react'
import { Affix, Card, type CardProps } from 'antd'

type AffixCardProps = {
  affixContainer: RefObject<HTMLElement>
  children: React.ReactNode
  onChangeAffix: (affixed: boolean) => void
}
export default function AffixCard({
  affixContainer,
  children,
  onChangeAffix,
}: AffixCardProps) {
  const cardProps: CardProps = {
    type: 'inner',
    bordered: false,
    styles: { body: { padding: '5px 0 5px 0', pointerEvents: 'none' } },
    style: {
      borderRadius: 0,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      pointerEvents: 'none',
    },
  }

  return (
    <Affix
      target={() => affixContainer.current}
      onChange={(affixed) => onChangeAffix(affixed ?? false)}
      style={{ pointerEvents: 'none' }}
    >
      <Card {...cardProps}>{children}</Card>
    </Affix>
  )
}
