import { useNavigate } from 'react-router-dom'
import { MenuOutlined, MoonFilled, SunFilled } from '@ant-design/icons'
import { Button, Flex, Segmented, Typography } from 'antd'
import styles from './CustomFont.module.css'
import useScreenSize from '@/hooks/useScreenSize.ts'
import { MENU_LINKS } from '@/pages/Home/constate.ts'
import { themeSelector, useAppDispatch, useSelector } from '@/store'
import { toggleTheme } from '@/store/themeSlice.ts'

interface Props {
  toggleDrawerOpen: () => void
}
export default function HomeHeaderContents({ toggleDrawerOpen }: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useSelector(themeSelector)
  const { isMobile } = useScreenSize(false)

  return (
    <>
      <Flex vertical style={{ flexGrow: 1, backgroundColor: 'transparent' }}>
        <Typography.Title
          level={3}
          className={styles.customFont}
          style={{ margin: 0 }}
        >
          Memento Nexus
        </Typography.Title>
      </Flex>
      {isMobile ? null : (
        <>
          {MENU_LINKS.map((info, idx) => (
            <Typography.Link key={idx} onClick={() => navigate(info.to)}>
              {info.label}
            </Typography.Link>
          ))}
        </>
      )}
      <Segmented
        size="small"
        value={theme}
        onChange={() => dispatch(toggleTheme())}
        options={[
          { value: 'light', icon: <SunFilled /> },
          { value: 'dark', icon: <MoonFilled /> },
        ]}
        style={{ backgroundColor: '#888', color: 'white' }}
      />
      {isMobile ? (
        <Button
          type="text"
          size="large"
          shape="circle"
          icon={<MenuOutlined />}
          onClick={toggleDrawerOpen}
        />
      ) : null}
    </>
  )
}
