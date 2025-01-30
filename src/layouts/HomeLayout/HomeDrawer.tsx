import { type Dispatch, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Drawer, Menu } from 'antd'
import { MENU_LINKS } from '@/layouts/HomeLayout/constate.ts'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
export default function HomeDrawer({ open, setOpen }: Props) {
  const navigate = useNavigate()
  return (
    <Drawer
      title="Basic AppDrawer"
      onClose={() => setOpen(false)}
      open={open}
      closeIcon={false}
      width={250}
      style={{ zIndex: 1000 }}
      extra={
        <Button
          type="text"
          shape="circle"
          icon={<CloseOutlined />}
          onClick={() => setOpen(false)}
        />
      }
    >
      <Menu
        inlineIndent={10}
        mode="inline"
        style={{ border: 'none', backgroundColor: 'transparent' }}
        items={MENU_LINKS.map((info, idx) => ({
          key: idx,
          label: info.label,
          onClick: () => {
            setOpen(false)
            setTimeout(() => navigate(info.to), 100)
          },
        }))}
        selectable={false}
      />
    </Drawer>
  )
}
