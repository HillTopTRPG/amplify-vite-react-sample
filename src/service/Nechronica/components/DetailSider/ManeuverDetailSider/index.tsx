import { Flex } from 'antd'
import ManeuverImportButton from './ManeuverImportButton.tsx'
import SelectedManeuversElm from './SelectedManeuversElm.tsx'
import { useScreenContext } from '@/context/screenContext.ts'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'

export default function ManeuverDetailSider() {
  const { screenSize } = useScreenContext()
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
          gap={8}
          align="flex-start"
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
      style={{
        position: 'fixed',
        right: 0,
        top: 48,
        bottom: 0,
        width: 336,
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
