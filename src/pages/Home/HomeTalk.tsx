import { useMemo } from 'react'
import { Tooltip } from 'antd'

interface Props {
  open: boolean
}
export default function HomeTalk({ open }: Props) {
  return useMemo(
    () => (
      <Tooltip
        placement="topRight"
        title="気楽にいこ"
        open={open}
        color="white"
        mouseEnterDelay={1}
        style={{ pointerEvents: 'none' }}
        styles={{
          root: { pointerEvents: 'none' },
          body: { backgroundColor: 'white', color: 'black', fontSize: 30 },
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% - 70px)',
            top: 'calc(50% - 140px)',
          }}
        ></div>
      </Tooltip>
    ),
    [open],
  )
}
