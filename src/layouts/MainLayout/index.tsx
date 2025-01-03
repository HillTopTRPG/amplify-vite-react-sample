import { type CSSProperties, type ReactNode, useRef } from 'react'
import { ConfigProvider, Layout, theme } from 'antd'
import MediaQuery from 'react-responsive'
import AppMenu from './AppMenu.tsx'
import Drawer from './Drawer.tsx'
import PageScrollDispatcher from './PageScrollDispatcher.tsx'
import Sider from './Sider.tsx'
import { MEDIA_QUERY } from '@/const/style.ts'
import { type ScreenSize, useScreenContext } from '@/context/screenContext.ts'
import { ScrollContainerProvider } from '@/context/scrollContainer.ts'
import { useThemeContext } from '@/context/themeContext.ts'

const { defaultAlgorithm, darkAlgorithm } = theme

interface Props {
  containerStyle:
    | ((screenSize: ScreenSize) => CSSProperties | false | null | undefined)
    | undefined
  children: ReactNode
}
export default function MainLayout({ containerStyle, children }: Props) {
  const { theme } = useThemeContext()
  const algorithm = theme === 'dark' ? darkAlgorithm : defaultAlgorithm
  const scrollContainerRef = useRef<HTMLElement>(null)
  const { screenSize } = useScreenContext()

  return (
    <>
      <PageScrollDispatcher scrollContainer={scrollContainerRef} />
      <ScrollContainerProvider scrollContainerRef={scrollContainerRef}>
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
              <MediaQuery {...MEDIA_QUERY.MOBILE}>
                <Drawer />
              </MediaQuery>
              <Layout.Content
                className="main-scroll-container"
                style={{
                  overflow: 'hidden scroll',
                  position: 'relative',
                  ...(containerStyle?.(screenSize) || {}),
                }}
                ref={scrollContainerRef}
              >
                {children}
              </Layout.Content>
            </Layout>
          </Layout>
        </ConfigProvider>
      </ScrollContainerProvider>
    </>
  )
}
