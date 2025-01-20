import { type CSSProperties, type ReactNode, useRef } from 'react'
import { ConfigProvider, Layout, theme } from 'antd'
import MediaQuery from 'react-responsive'
import AppMenu from './AppMenu.tsx'
import Drawer from './Drawer.tsx'
import PageScrollDispatcher from './PageScrollDispatcher.tsx'
import Sider from './Sider.tsx'
import { MEDIA_QUERY } from '@/const/style.ts'
import { scrollContainerContext } from '@/context/scrollContainer.ts'
import useScreenSize, { type ScreenSize } from '@/hooks/useScreenSize.ts'
import { drawerStatusSelector, themeSelector, useSelector } from '@/store'

const { defaultAlgorithm, darkAlgorithm } = theme

interface Props {
  containerStyle:
    | ((screenSize: ScreenSize) => CSSProperties | false | null | undefined)
    | undefined
  children: ReactNode
}
export default function MainLayout({ containerStyle, children }: Props) {
  const theme = useSelector(themeSelector)
  const algorithm = theme === 'dark' ? darkAlgorithm : defaultAlgorithm
  const scrollContainerRef = useRef<HTMLElement>(null)
  const drawerStatus = useSelector(drawerStatusSelector)
  const screenSize = useScreenSize(drawerStatus)

  return (
    <>
      <PageScrollDispatcher scrollContainer={scrollContainerRef} />
      <scrollContainerContext.Provider value={scrollContainerRef}>
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
      </scrollContainerContext.Provider>
    </>
  )
}
