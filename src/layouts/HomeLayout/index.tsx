import { type CSSProperties, type ReactNode, useState } from 'react'
import { type FlexProps, Layout } from 'antd'
import HomeHeader from './HomeHeader.tsx'
import useTitleCustomFont from '@/hooks/useTitleCustomFont.ts'
import HomeDrawer from '@/layouts/HomeLayout/HomeDrawer.tsx'

const contentStyle: CSSProperties = {
  backgroundColor: 'transparent',
  paddingTop: 64,
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
}

interface Props {
  children: ReactNode
  layoutBack?: ReactNode
  onScrollCapture?: FlexProps['onScrollCapture']
  footer?: ReactNode
  hideMenu?: boolean
}
export default function HomeLayout({
  children,
  layoutBack,
  onScrollCapture,
  footer,
  hideMenu,
}: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  useTitleCustomFont()

  return (
    <Layout onScrollCapture={onScrollCapture}>
      <HomeHeader
        hideMenu={hideMenu}
        toggleDrawerOpen={() => setDrawerOpen((v) => !v)}
      />
      <HomeDrawer open={drawerOpen} setOpen={setDrawerOpen} />
      {layoutBack}
      <Layout
        style={{
          flexGrow: 1,
          position: 'relative',
          backgroundColor: 'transparent',
        }}
      >
        <Layout.Content style={contentStyle}>{children}</Layout.Content>
      </Layout>
      {footer}
    </Layout>
  )
}
