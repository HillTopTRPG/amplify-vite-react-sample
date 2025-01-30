import { type CSSProperties, type ReactNode, useRef } from 'react'
import { ConfigProvider, Layout, theme as AntdTheme, theme } from 'antd'
import AppDrawer from './AppDrawer.tsx'
import AppMenu from './AppMenu.tsx'
import PageScrollDispatcher from './PageScrollDispatcher.tsx'
import Sider from './Sider.tsx'
import { scrollContainerContext } from '@/context/scrollContainer.ts'
import useScreenSize, { type ScreenSize } from '@/hooks/useScreenSize.ts'
import { useAppSelector } from '@/store'
import { selectDrawerStatus } from '@/store/drawerStatusSlice.ts'
import { selectTheme } from '@/store/themeSlice.ts'

const { defaultAlgorithm, darkAlgorithm } = theme

interface Props {
  containerStyle:
    | ((screenSize: ScreenSize) => CSSProperties | false | null | undefined)
    | undefined
  children: ReactNode
}
export default function MainLayout({ containerStyle, children }: Props) {
  const theme = useAppSelector(selectTheme)
  const { token } = AntdTheme.useToken()
  const algorithm = theme === 'dark' ? darkAlgorithm : defaultAlgorithm
  const scrollContainerRef = useRef<HTMLElement>(null)
  const drawerStatus = useAppSelector(selectDrawerStatus)
  const { isMobile } = useScreenSize(drawerStatus)
  const open = useAppSelector(selectDrawerStatus)
  const screenSize = useScreenSize(drawerStatus)

  return (
    <>
      <PageScrollDispatcher scrollContainer={scrollContainerRef} />
      <scrollContainerContext.Provider value={scrollContainerRef}>
        <ConfigProvider
          theme={{ algorithm }}
          divider={{ style: { margin: '5px 0' } }}
        >
          <Layout>
            <AppMenu />
            <Layout
              style={{
                ...containerStyle,
                backgroundColor: token.colorBgLayout,
                position: 'relative',
                paddingTop: '3rem',
                zIndex: 0,
              }}
            >
              {isMobile ? <AppDrawer /> : <Sider />}
              <Layout.Content
                className="main-scroll-container"
                style={{
                  position: 'relative',
                  paddingLeft: isMobile ? 0 : open ? 200 : 50,
                  transition: 'padding-left 250ms',
                  backgroundColor: 'transparent',
                  ...(containerStyle?.call(null, screenSize) || {}),
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
