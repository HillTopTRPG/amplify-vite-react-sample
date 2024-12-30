import { Flex } from 'antd'
import { useScreenContext } from '@/context/screenContext.ts'
import SelectedCharacterElm from '@/service/Nechronica/components/CharacterTypeScreen/SelectedCharacterElm.tsx'

export default function DetailSider({ detailList }: { detailList: string[] }) {
  const { screenSize } = useScreenContext()

  if (screenSize.isMobile) return null

  return (
    <Flex vertical align="stretch" gap={8}>
      <SelectedCharacterElm detailList={detailList} />
    </Flex>
  )
}
