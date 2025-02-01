import { Flex, Layout, theme } from 'antd'
import AppMenuExtraItems from './AppMenuExtraItems.tsx'
import AppMenuMainItems from './AppMenuMainItems.tsx'
import { useAppSelector } from '@/store'
import { selectDrawerStatus } from '@/store/drawerStatusSlice.ts'
import { selectTheme } from '@/store/themeSlice.ts'

export default function AppSider() {
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
        left: 0,
        bottom: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: token.colorBgContainer,
        borderRight: `solid 1px ${themeType === 'dark' ? '#222' : '#e7e7e7'}`,
      }}
    >
      <Flex vertical style={{ height: 'calc(100vh - 3rem)' }}>
        <AppMenuMainItems />
        <AppMenuExtraItems />
      </Flex>
    </Layout.Sider>
  )
}
