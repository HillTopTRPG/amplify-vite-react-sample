import { useNechronicaContext } from '@Nechronica/context.ts'
import { type NechronicaCharacter } from '@Nechronica/ts/NechronicaDataHelper.ts'
import { Flex } from 'antd'
import SelectedCharacterElm from './SelectedCharacterElm.tsx'
import { useScreenContext } from '@/context/screenContext.ts'

interface Props {
  characters: NechronicaCharacter[]
}
export default function CharacterDetailSider({ characters }: Props) {
  const { screenSize } = useScreenContext()
  const { setHoverManeuverId, setClickManeuverId } = useNechronicaContext()

  if (screenSize.viewPortWidth < 789) {
    return (
      <Flex vertical align="stretch" gap={8} style={{ minHeight: '100vh' }}>
        <SelectedCharacterElm characters={characters} />
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
        <SelectedCharacterElm characters={characters} />
      </Flex>
    </div>
  )
}
