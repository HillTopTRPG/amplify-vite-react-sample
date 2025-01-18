import { Flex } from 'antd'
import SelectedCharacterElm from './SelectedCharacterElm.tsx'
import { useScreenContext } from '@/context/screenContext.ts'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'

interface Props {
  detailList: string[]
}
export default function CharacterDetailSider({ detailList }: Props) {
  const { screenSize } = useScreenContext()
  const { setHoverManeuverId, setClickManeuverId } = useNechronicaContext()

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
        setHoverManeuverId('')
        setClickManeuverId('')
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
