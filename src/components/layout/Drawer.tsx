import { Drawer as AntdDrawer } from 'antd'
import ScreenSelectMenu from '@/components/layout/ScreenSelectMenu.tsx'
import { useScreenContext } from '@/context/screenContext.ts'

export default function Drawer() {
  const { open, setOpenStatus } = useScreenContext()
  const onSelect = () => setOpenStatus(false)
  return (
    <AntdDrawer
      title=""
      width={200}
      placement="left"
      closable={false}
      onClose={() => setOpenStatus(false)}
      open={open}
      getContainer={false}
      style={{
        bottom: 0,
      }}
      styles={{
        body: {
          padding: 0,
        },
        header: {
          padding: 0,
        },
      }}
    >
      <ScreenSelectMenu onSelect={onSelect} />
    </AntdDrawer>
  )
}
