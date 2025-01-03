import { type ReactNode, useCallback, useMemo } from 'react'
import { Flex, type FlexProps } from 'antd'
import { useScreenContext } from '@/context/screenContext.ts'
import SectionTitle from '@/service/Nechronica/components/DashboardContents/SectionTitle.tsx'

const containerProps: Omit<FlexProps, 'children'> = {
  gap: 4,
  vertical: true,
  align: 'flex-start',
  style: { overflow: 'hidden' },
}

interface Props {
  dollsElm: ReactNode
  dollsTotal: string
  enemiesElm: ReactNode
  enemiesTotal: string
}
export default function CharacterTabContents({
  dollsElm,
  dollsTotal,
  enemiesElm,
  enemiesTotal,
}: Props) {
  const { setScreen } = useScreenContext()

  const toDoll = useCallback(
    () => setScreen((v) => ({ ...v, screen: 'dolls' })),
    [setScreen],
  )

  return useMemo(
    () => (
      <Flex gap={16} wrap align="stretch" justify="stretch">
        <Flex {...containerProps}>
          <SectionTitle label="ドール" total={dollsTotal} onClick={toDoll} />
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
    ),
    [dollsElm, dollsTotal, enemiesElm, enemiesTotal, toDoll],
  )
}
