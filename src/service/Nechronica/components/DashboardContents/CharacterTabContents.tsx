import { type ReactNode, useCallback, useMemo } from 'react'
import SectionTitle from '@Nechronica/components/DashboardContents/SectionTitle.tsx'
import { screens } from '@Nechronica/screens'
import { Flex, type FlexProps } from 'antd'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'

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
  const { setScreen } = useScreenNavigateInService(screens)

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
