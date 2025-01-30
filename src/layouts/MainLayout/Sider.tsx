import { Layout, theme } from 'antd'
import ScreenSelectMenu from './ScreenSelectMenu.tsx'
import { useAppSelector } from '@/store'
import { selectDrawerStatus } from '@/store/drawerStatusSlice.ts'
import { selectTheme } from '@/store/themeSlice.ts'

export default function Sider() {
  const themeType = useAppSelector(selectTheme)
  const open = useAppSelector(selectDrawerStatus)
  const { token } = theme.useToken()

  return (
    <Layout.Sider
      breakpoint="xl"
      collapsedWidth={50}
      width={200}
      theme={themeType}
      collapsed={!open}
      style={{
        position: 'fixed',
        top: '3rem',
        width: 200,
        left: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: token.colorBgContainer,
        borderRight: `solid 1px ${themeType === 'dark' ? '#222' : '#e7e7e7'}`,
      }}
    >
      <ScreenSelectMenu />
    </Layout.Sider>
  )
}
