import { type CSSProperties } from 'react'
import { useNechronicaContext } from '@Nechronica/context.ts'
import { Flex } from 'antd'
import ManeuverImportButton from './ManeuverImportButton.tsx'
import SelectedManeuversElm from './SelectedManeuversElm.tsx'
import useScreenSize from '@/hooks/useScreenSize.ts'
import { drawerStatusSelector, useSelector } from '@/store'

const CONTAINER_STYLE: CSSProperties = {
  position: 'fixed',
  right: 0,
  top: 48,
  bottom: 0,
  width: 336,
  overflow: 'auto',
}

export default function ManeuverDetailSider() {
  const drawerStatus = useSelector(drawerStatusSelector)
  const screenSize = useScreenSize(drawerStatus)
  const { setHoverManeuverId, setClickManeuverId } = useNechronicaContext()

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
        setHoverManeuverId('')
        setClickManeuverId('')
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
