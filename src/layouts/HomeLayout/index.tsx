import { type CSSProperties, type ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons'
import {
  Button,
  Drawer,
  type FlexProps,
  Layout,
  Menu,
  theme as AntTheme,
} from 'antd'
import HomeHeaderContents from './HomeHeaderContents.tsx'
import { MENU_LINKS } from './constate.ts'
import useTitleCustomFont from '@/hooks/useTitleCustomFont.ts'
import { themeSelector, useSelector } from '@/store'

const contentStyle: CSSProperties = {
  backgroundColor: 'transparent',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  overflow: 'hidden',
  height: 'fit-content',
}

interface Props {
  children: ReactNode
  layoutBack?: ReactNode
  onScrollCapture?: FlexProps['onScrollCapture']
  footerContents: ReactNode
}
export default function HomeLayout({
  children,
  layoutBack,
  onScrollCapture,
  footerContents,
}: Props) {
  const theme = useSelector(themeSelector)
  const { token } = AntTheme.useToken()
  const navigate = useNavigate()

  useTitleCustomFont()

  const [drawerOpen, setDrawerOpen] = useState(false)

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    gap: 18,
    color: theme === 'dark' ? token.colorBgContainer : token.colorBgBlur,
    borderBottom: `solid 1px ${theme === 'dark' ? '#222' : '#e7e7e7'}`,
    padding: '0 20px',
  }

  return (
    <Layout style={{ overflow: 'hidden', height: '100vh' }}>
      <Layout.Header style={headerStyle}>
        <HomeHeaderContents toggleDrawerOpen={() => setDrawerOpen((v) => !v)} />
      </Layout.Header>
      <Drawer
        title="Basic Drawer"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={false}
        width={250}
        extra={
          <Button
            type="text"
            shape="circle"
            icon={<CloseOutlined />}
            onClick={() => setDrawerOpen(false)}
          />
        }
      >
        <Menu
          inlineIndent={10}
          mode="inline"
          style={{ border: 'none' }}
          items={MENU_LINKS.map((info, idx) => ({
            key: idx,
            label: info.label,
            onClick: () => navigate(info.to),
          }))}
          selectable={false}
        />
      </Drawer>
      <Layout
        onScrollCapture={onScrollCapture}
        style={{ flexGrow: 1, overflow: 'hidden', position: 'relative' }}
      >
        {layoutBack}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'auto',
          }}
        >
          <Layout.Content style={contentStyle}>{children}</Layout.Content>
        </div>
      </Layout>
      {footerContents}
    </Layout>
  )
}
