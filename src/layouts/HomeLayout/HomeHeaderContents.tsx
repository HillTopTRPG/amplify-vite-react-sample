import { useNavigate } from 'react-router-dom'
import { MenuOutlined, MoonFilled, SunFilled } from '@ant-design/icons'
import { Button, Flex, Segmented, Typography } from 'antd'
import { MENU_LINKS } from './constate.ts'
import useScreenSize from '@/hooks/useScreenSize.ts'
import styles from '@/pages/Home/CustomFont.module.css'
import { themeSelector, useAppDispatch, useSelector } from '@/store'
import { toggleTheme } from '@/store/themeSlice.ts'

interface Props {
  toggleDrawerOpen: () => void
}
export default function HomeHeaderContents({ toggleDrawerOpen }: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useSelector(themeSelector)
  const { width } = useScreenSize(false)
  const withIcon = width < 730

  return (
    <>
      <Flex vertical style={{ flexGrow: 1, backgroundColor: 'transparent' }}>
        <Typography.Title
          level={3}
          className={styles.customFont}
          style={{ margin: 0, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Memento Nexus
        </Typography.Title>
      </Flex>
      {withIcon ? null : (
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
      {withIcon ? (
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
