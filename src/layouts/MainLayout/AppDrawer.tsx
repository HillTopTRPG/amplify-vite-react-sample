import { useCallback, useMemo } from 'react'
import { Drawer } from 'antd'
import { useDispatch } from 'react-redux'
import ScreenSelectMenu from './ScreenSelectMenu.tsx'
import { useAppSelector } from '@/store'
import {
  selectDrawerStatus,
  setDrawerStatus,
} from '@/store/drawerStatusSlice.ts'

export default function AppDrawer() {
  const dispatch = useDispatch()
  const open = useAppSelector(selectDrawerStatus)
  const setOpenStatus = useCallback(
    (v: boolean) => dispatch(setDrawerStatus(v)),
    [dispatch],
  )

  return useMemo(
    () => (
      <Drawer
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
      </Drawer>
    ),
    [open, setOpenStatus],
  )
}
