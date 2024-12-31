import { type CSSProperties, type ReactNode, useRef } from 'react'
import { ConfigProvider, Layout, theme } from 'antd'
import MediaQuery from 'react-responsive'
import PageScrollDispatcher from '@/components/PageScrollDispatcher.tsx'
import AppMenu from '@/components/layout/AppMenu.tsx'
import Drawer from '@/components/layout/Drawer.tsx'
import Sider from '@/components/layout/Sider.tsx'
import { MEDIA_QUERY } from '@/const/style.ts'
import { type ScreenSize, useScreenContext } from '@/context/screenContext.ts'
import { useThemeContext } from '@/context/themeContext.ts'

const { defaultAlgorithm, darkAlgorithm } = theme

export default function MainContentsLayout({
  containerStyle,
  children,
}: {
  containerStyle:
    | ((screenSize: ScreenSize) => CSSProperties | false | null | undefined)
    | undefined
  children: ReactNode
}) {
  const { theme } = useThemeContext()
  const algorithm = theme === 'dark' ? darkAlgorithm : defaultAlgorithm
  const scrollContainer = useRef<HTMLElement>(null)
  const { screenSize } = useScreenContext()

  return (
    <>
      <PageScrollDispatcher scrollContainer={scrollContainer} />
      <ConfigProvider
        theme={{ algorithm }}
        divider={{ style: { margin: '5px 0' } }}
      >
        <Layout style={{ height: '100vh' }}>
          <AppMenu />
          <Layout
            style={{
              backgroundColor: 'transparent',
              overflow: 'hidden',
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
                ...(containerStyle?.(screenSize) || {}),
              }}
              ref={scrollContainer}
            >
              <MediaQuery {...MEDIA_QUERY.MOBILE}>
                <Drawer />
              </MediaQuery>
              {children}
            </Layout.Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  )
}
