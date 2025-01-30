import { type CSSProperties, type ReactNode, useRef } from 'react'
import { Layout, theme } from 'antd'
import AppDrawer from './AppDrawer.tsx'
import AppMenu from './AppMenu.tsx'
import PageScrollDispatcher from './PageScrollDispatcher.tsx'
import Sider from './Sider.tsx'
import { scrollContainerContext } from '@/context/scrollContainer.ts'
import useScreenSize, { type ScreenSize } from '@/hooks/useScreenSize.ts'
import AppBreadcrumb from '@/layouts/MainLayout/AppBreadcrumb.tsx'
import { useAppSelector } from '@/store'
import { selectDrawerStatus } from '@/store/drawerStatusSlice.ts'

interface Props {
  containerStyle:
    | ((screenSize: ScreenSize) => CSSProperties | false | null | undefined)
    | undefined
  children: ReactNode
}
export default function MainLayout({ containerStyle, children }: Props) {
  const { token } = theme.useToken()
  const scrollContainerRef = useRef<HTMLElement>(null)
  const drawerStatus = useAppSelector(selectDrawerStatus)
  const { isMobile } = useScreenSize(drawerStatus)
  const open = useAppSelector(selectDrawerStatus)
  const screenSize = useScreenSize(drawerStatus)

  return (
    <>
      <PageScrollDispatcher scrollContainer={scrollContainerRef} />
      <scrollContainerContext.Provider value={scrollContainerRef}>
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
              <AppBreadcrumb />
              {children}
            </Layout.Content>
          </Layout>
        </Layout>
      </scrollContainerContext.Provider>
    </>
  )
}
