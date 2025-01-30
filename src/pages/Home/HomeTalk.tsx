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
        title="気楽にいこ？"
        open={open}
        color="white"
        mouseEnterDelay={1}
        style={{ pointerEvents: 'none' }}
        styles={{
          root: { pointerEvents: 'none', position: 'fixed' },
          body: { backgroundColor: 'white', color: 'black', fontSize: 25 },
        }}
      >
        <div
          style={{
            position: 'fixed',
            left: 'calc(50% - 80px)',
            top: 'calc((100vh - 128px) * 0.26  + 64px)',
            width: 2,
          }}
        ></div>
      </Tooltip>
    ),
    [open],
  )
}
