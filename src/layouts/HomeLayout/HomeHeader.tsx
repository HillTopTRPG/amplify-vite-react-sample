import { type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'
import { Button, Flex, Layout, theme, Typography } from 'antd'
import { MENU_LINKS } from './constate.ts'
import ThemeTypeSwitch from '@/components/ThemeTypeSwitch.tsx'
import useScreenSize from '@/hooks/useScreenSize.ts'
import styles from '@/pages/Home/CustomFont.module.css'
import { useAppSelector } from '@/store'
import { selectTheme } from '@/store/themeSlice.ts'

interface Props {
  toggleDrawerOpen: () => void
  hideMenu?: boolean
}
export default function HomeHeader({ toggleDrawerOpen, hideMenu }: Props) {
  const navigate = useNavigate()
  const themeType = useAppSelector(selectTheme)
  const { token } = theme.useToken()
  const { width } = useScreenSize(false)

  const withIcon = width < 730

  const headerStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: token.colorBgLayout,
    gap: 18,
    color: themeType === 'dark' ? token.colorBgContainer : token.colorBgBlur,
    borderBottom: `solid 1px ${themeType === 'dark' ? '#222' : '#e7e7e7'}`,
    padding: '0 20px',
  }

  return (
    <Layout.Header style={headerStyle}>
      <Flex vertical align="flex-start" style={{ flexGrow: 1 }}>
        <Typography.Title
          level={3}
          className={styles.customFont}
          style={{ margin: 0, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Memento Nexus
        </Typography.Title>
      </Flex>
      {!hideMenu && !withIcon ? (
        <>
          {MENU_LINKS.map((info, idx) => (
            <Typography.Link key={idx} onClick={() => navigate(info.to)}>
              {info.label}
            </Typography.Link>
          ))}
        </>
      ) : null}
      <ThemeTypeSwitch />
      {!hideMenu && withIcon ? (
        <Button
          type="text"
          size="large"
          shape="circle"
          icon={<MenuOutlined />}
          onClick={toggleDrawerOpen}
        />
      ) : null}
    </Layout.Header>
  )
}
