import { Layout, theme as AntdTheme } from 'antd'
import ScreenSelectMenu from './ScreenSelectMenu.tsx'
import { useAppSelector } from '@/store'
import { selectDrawerStatus } from '@/store/drawerStatusSlice.ts'
import { selectTheme } from '@/store/themeSlice.ts'

export default function Sider() {
  const theme = useAppSelector(selectTheme)
  const open = useAppSelector(selectDrawerStatus)
  const { token } = AntdTheme.useToken()

  return (
    <Layout.Sider
      breakpoint="xl"
      collapsedWidth={50}
      width={200}
      theme={theme}
      collapsed={!open}
      style={{
        position: 'fixed',
        top: '3rem',
        width: 200,
        left: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: token.colorBgContainer,
        borderRight: `solid 1px ${theme === 'dark' ? '#222' : '#e7e7e7'}`,
      }}
    >
      <ScreenSelectMenu />
    </Layout.Sider>
  )
}
