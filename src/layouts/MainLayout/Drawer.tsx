import { useCallback, useMemo } from 'react'
import { Drawer as AntdDrawer } from 'antd'
import { useDispatch } from 'react-redux'
import ScreenSelectMenu from './ScreenSelectMenu.tsx'
import { drawerStatusSelector, useSelector } from '@/store'
import { setDrawerStatus } from '@/store/drawerStatusSlice.ts'

export default function Drawer() {
  const dispatch = useDispatch()
  const open = useSelector(drawerStatusSelector)
  const setOpenStatus = useCallback(
    (v: boolean) => dispatch(setDrawerStatus(v)),
    [dispatch],
  )

  return useMemo(
    () => (
      <AntdDrawer
        title=""
        width={200}
        placement="left"
        closable={false}
        onClose={() => setOpenStatus(false)}
        open={open}
        getContainer={false}
        styles={{
          content: {
            marginTop: 48,
            height: 'calc(100% - 48px)',
          },
          body: {
            padding: 0,
          },
          header: {
            padding: 0,
          },
        }}
      >
        <ScreenSelectMenu onSelect={() => setOpenStatus(false)} />
      </AntdDrawer>
    ),
    [open, setOpenStatus],
  )
}
