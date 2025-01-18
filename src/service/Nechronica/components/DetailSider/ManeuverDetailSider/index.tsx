import { Flex } from 'antd'
import SelectedManeuversElm from './SelectedManeuversElm.tsx'
import { useScreenContext } from '@/context/screenContext.ts'
import { type ManeuverInfo } from '@/service/Nechronica/components/ManeuverContents/index.tsx'
import { useNechronicaContext } from '@/service/Nechronica/context.ts'

interface Props {
  detailList: ManeuverInfo[]
}
export default function ManeuverDetailSider({ detailList }: Props) {
  const { screenSize } = useScreenContext()
  const { setHoverManeuverId, setClickManeuverId } = useNechronicaContext()

  if (screenSize.viewPortWidth < 789) {
    return (
      <Flex
        gap={8}
        justify="space-evenly"
        align="flex-start"
        wrap
        style={{ minHeight: '100vh', alignContent: 'flex-start' }}
      >
        <SelectedManeuversElm detailList={detailList} />
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
        <SelectedManeuversElm detailList={detailList} />
      </Flex>
    </div>
  )
}
