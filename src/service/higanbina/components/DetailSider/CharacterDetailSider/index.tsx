import { type NechronicaCharacter } from '@higanbina/ts/NechronicaDataHelper.ts'
import { Flex, theme } from 'antd'
import SelectedCharacterElm from './SelectedCharacterElm.tsx'
import useScreenSize from '@/hooks/useScreenSize.ts'
import { drawerStatusSelector, useAppDispatch, useSelector } from '@/store'
import {
  setClickManeuverId,
  setHoverManeuverId,
} from '@/store/nechronicaSlice.ts'

interface Props {
  characters: NechronicaCharacter[]
}
export default function CharacterDetailSider({ characters }: Props) {
  const dispatch = useAppDispatch()
  const drawerStatus = useSelector(drawerStatusSelector)
  const screenSize = useScreenSize(drawerStatus)
  const { token } = theme.useToken()

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
        backgroundColor: token.colorBgLayout,
      }}
      onScrollCapture={(e) => {
        e.stopPropagation()
        dispatch(setHoverManeuverId(''))
        dispatch(setClickManeuverId(''))
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
