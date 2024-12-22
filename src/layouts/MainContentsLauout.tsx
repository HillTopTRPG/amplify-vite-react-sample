import { ConfigProvider, type GetProps, Layout } from 'antd'
import MediaQuery from 'react-responsive'
import AppMenu from '@/components/layout/AppMenu.tsx'
import Drawer from '@/components/layout/Drawer.tsx'
import DynamicScreen from '@/components/layout/DynamicScreen.tsx'
import Sider from '@/components/layout/Sider.tsx'
import { MEDIA_QUERY } from '@/const/style.ts'
import { ScreenProvider } from '@/context/screen.ts'
import { useUserAttributes } from '@/context/userAttributes.ts'

type ScreenProviderProps = GetProps<typeof ScreenProvider>

export default function MainContentsLayout(props: ScreenProviderProps) {
  const { algorithm } = useUserAttributes()

  return (
    <ConfigProvider
      theme={{ algorithm }}
      divider={{ style: { margin: '5px 0' } }}
    >
      <Layout style={{ height: '100vh' }}>
        <ScreenProvider {...props}>
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
        </ScreenProvider>
      </Layout>
    </ConfigProvider>
  )
}
