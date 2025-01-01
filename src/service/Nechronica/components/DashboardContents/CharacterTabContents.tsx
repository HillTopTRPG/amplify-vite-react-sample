import { type ReactNode } from 'react'
import { Flex, type FlexProps } from 'antd'
import { useScreenContext } from '@/context/screenContext.ts'
import SectionTitle from '@/service/Nechronica/components/DashboardContents/SectionTitle.tsx'

export default function CharacterTabContents({
  dollsElm,
  dollsTotal,
  enemiesElm,
  enemiesTotal,
}: {
  dollsElm: ReactNode
  dollsTotal: string
  enemiesElm: ReactNode
  enemiesTotal: string
}) {
  const { setScreen } = useScreenContext()
  const containerProps: Omit<FlexProps, 'children'> = {
    gap: 4,
    vertical: true,
    align: 'flex-start',
    style: { overflow: 'hidden' },
  }
  return (
    <Flex gap={16} wrap align="stretch" justify="stretch">
      <Flex {...containerProps}>
        <SectionTitle
          label="ドール"
          total={dollsTotal}
          onClick={() => setScreen((v) => ({ ...v, screen: 'dolls' }))}
        />
        <Flex gap={16} wrap>
          {dollsElm}
        </Flex>
      </Flex>
      <Flex {...containerProps}>
        <SectionTitle label="手駒" total={enemiesTotal} />
        <Flex gap={16} wrap>
          {enemiesElm}
        </Flex>
      </Flex>
    </Flex>
  )
}
