import { Flex } from 'antd'
import { useScreenContext } from '@/context/screenContext.ts'
import SelectedCharacterElm from '@/service/Nechronica/components/CharacterTypeScreen/SelectedCharacterElm.tsx'

interface Props {
  detailList: string[]
}
export default function DetailSider({ detailList }: Props) {
  const { screenSize } = useScreenContext()

  if (screenSize.viewPortWidth < 789) {
    return (
      <Flex vertical align="stretch" gap={8} style={{ minHeight: '100vh' }}>
        <SelectedCharacterElm detailList={detailList} />
      </Flex>
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 48,
        bottom: 0,
        width: 420,
        overflow: 'auto',
      }}
      onScrollCapture={(e) => {
        e.stopPropagation()
      }}
    >
      <Flex
        vertical
        align="stretch"
        gap={8}
        style={{ minHeight: 'calc(100vh - 48px)' }}
      >
        <SelectedCharacterElm detailList={detailList} />
      </Flex>
    </div>
  )
}
