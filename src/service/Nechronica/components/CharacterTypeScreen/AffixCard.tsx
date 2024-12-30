import { type ReactNode, type RefObject, useMemo } from 'react'
import { Affix, Card, type CardProps } from 'antd'

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

type AffixCardProps = {
  affixContainerRef: RefObject<HTMLElement>
  children: ReactNode
  onChangeAffix: (affixed: boolean) => void
}
export default function AffixCard({
  affixContainerRef,
  children,
  onChangeAffix,
}: AffixCardProps) {
  return useMemo(
    () => (
      <Affix
        target={() => affixContainerRef.current}
        onChange={(affixed) => onChangeAffix(affixed ?? false)}
        style={{ pointerEvents: 'none' }}
      >
        <Card {...cardProps}>{children}</Card>
      </Affix>
    ),
    [affixContainerRef, children, onChangeAffix],
  )
}
