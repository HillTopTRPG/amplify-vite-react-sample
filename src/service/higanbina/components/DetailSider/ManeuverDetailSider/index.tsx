import { type CSSProperties } from 'react'
import { Flex } from 'antd'
import ManeuverImportButton from './ManeuverImportButton.tsx'
import SelectedManeuversElm from './SelectedManeuversElm.tsx'
import useScreenSize from '@/hooks/useScreenSize.ts'
import { drawerStatusSelector, useAppDispatch, useSelector } from '@/store'
import {
  setClickManeuverId,
  setHoverManeuverId,
} from '@/store/nechronicaSlice.ts'

const CONTAINER_STYLE: CSSProperties = {
  position: 'fixed',
  right: 0,
  top: 48,
  bottom: 0,
  width: 336,
  overflow: 'auto',
}

export default function ManeuverDetailSider() {
  const dispatch = useAppDispatch()
  const drawerStatus = useSelector(drawerStatusSelector)
  const screenSize = useScreenSize(drawerStatus)

  if (screenSize.viewPortWidth < 789) {
    return (
      <Flex
        vertical
        gap={8}
        align="flex-start"
        justify="flex-start"
        style={{ minHeight: '100vh', alignContent: 'flex-start' }}
      >
        <ManeuverImportButton />
        <Flex
          align="flex-start"
          gap={8}
          justify="space-evenly"
          wrap
          style={{ alignContent: 'flex-start' }}
        >
          <SelectedManeuversElm />
        </Flex>
      </Flex>
    )
  }

  return (
    <div
      style={CONTAINER_STYLE}
      onScrollCapture={(e) => {
        e.stopPropagation()
        dispatch(setHoverManeuverId(''))
        dispatch(setClickManeuverId(''))
      }}
    >
      <Flex
        vertical
        align="flex-start"
        gap={8}
        style={{ minHeight: 'calc(100vh - 48px)' }}
      >
        <ManeuverImportButton />
        <SelectedManeuversElm />
      </Flex>
    </div>
  )
}
