import { ConfigProvider, Layout, theme } from 'antd'
import MediaQuery from 'react-responsive'
import AppMenu from '@/components/layout/AppMenu.tsx'
import Drawer from '@/components/layout/Drawer.tsx'
import DynamicScreen from '@/components/layout/DynamicScreen.tsx'
import Sider from '@/components/layout/Sider.tsx'
import { MEDIA_QUERY } from '@/const/style.ts'
import { useThemeContext } from '@/context/theme.ts'

const { defaultAlgorithm, darkAlgorithm } = theme

export default function MainContentsLayout() {
  const { theme } = useThemeContext()
  const algorithm = theme === 'dark' ? darkAlgorithm : defaultAlgorithm

  return (
    <ConfigProvider
      theme={{ algorithm }}
      divider={{ style: { margin: '5px 0' } }}
    >
      <Layout style={{ height: '100vh' }}>
        <AppMenu />
        <Layout
          style={{
            backgroundColor: 'transparent',
            overflow: 'hidden scroll',
            zIndex: 0,
          }}
        >
          <MediaQuery {...MEDIA_QUERY.PC}>
            <Sider />
          </MediaQuery>
          <Layout.Content
            style={{
              overflow: 'hidden scroll',
              position: 'relative',
            }}
          >
            <MediaQuery {...MEDIA_QUERY.MOBILE}>
              <Drawer />
            </MediaQuery>
            <DynamicScreen />
          </Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
