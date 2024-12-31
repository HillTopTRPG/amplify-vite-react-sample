import { Flex } from 'antd'
import { useScreenContext } from '@/context/screenContext.ts'
import SelectedCharacterElm from '@/service/Nechronica/components/CharacterTypeScreen/SelectedCharacterElm.tsx'

export default function DetailSider({ detailList }: { detailList: string[] }) {
  const { screenSize } = useScreenContext()

  if (screenSize.viewPortWidth < 789) return null

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 48,
        bottom: 0,
        width: 420,
      }}
    >
      <Flex vertical align="stretch" gap={8}>
        <SelectedCharacterElm detailList={detailList} />
      </Flex>
    </div>
  )
}
