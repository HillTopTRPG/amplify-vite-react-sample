import { useCallback, useMemo } from 'react'
import { Drawer, Flex } from 'antd'
import { useDispatch } from 'react-redux'
import AppMenuExtraItems from './AppMenuExtraItems.tsx'
import AppMenuMainItems from './AppMenuMainItems.tsx'
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
            position: 'fixed',
            width: 200,
          },
          body: {
            padding: 0,
          },
          header: {
            padding: 0,
          },
        }}
      >
        <Flex vertical style={{ height: 'calc(100vh - 3rem)' }}>
          <AppMenuMainItems />
          <AppMenuExtraItems />
        </Flex>
      </Drawer>
    ),
    [open, setOpenStatus],
  )
}
