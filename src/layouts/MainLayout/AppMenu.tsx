import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons'
import { useAuthenticator } from '@aws-amplify/ui-react'
import {
  theme,
  Button,
  Layout,
  Flex,
  Typography,
  Dropdown,
  type MenuProps,
  Space,
  Spin,
} from 'antd'
import { useDispatch } from 'react-redux'
import ThemeTypeSwitch from '@/components/ThemeTypeSwitch.tsx'
import useScreenNavigateInGlobal from '@/hooks/useScreenNavigateInGlobal.ts'
import useScreenSize from '@/hooks/useScreenSize.ts'
import styles from '@/pages/Home/CustomFont.module.css'
import { useAppSelector } from '@/store'
import {
  selectDrawerStatus,
  toggleDrawerStatus,
} from '@/store/drawerStatusSlice.ts'
import { selectTheme } from '@/store/themeSlice.ts'
import {
  selectMe,
  selectUserAttributesLoading,
} from '@/store/userAttributesSlice.ts'

export default function AppMenu() {
  const me = useAppSelector(selectMe)
  const loading = useAppSelector(selectUserAttributesLoading)
  const themeType = useAppSelector(selectTheme)
  const dispatch = useDispatch()
  const drawerStatus = useAppSelector(selectDrawerStatus)
  const screenSize = useScreenSize(drawerStatus)
  const { token } = theme.useToken()
  const { signOut } = useAuthenticator()
  const navigate = useNavigate()

  const { scope, setScreen } = useScreenNavigateInGlobal()

  const dropdownProps: MenuProps = useMemo(
    () => ({
      items: [
        {
          key: 'signOut',
          label: (
            <Space>
              <LogoutOutlined />
              <Typography.Text>ログアウト</Typography.Text>
            </Space>
          ),
        },
      ],
      onClick: ({ key }) => {
        if (key === 'signOut') {
          signOut()
        }
      },
    }),
    [signOut],
  )

  return useMemo(
    () => (
      <Layout.Header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3rem',
          lineHeight: '3rem',
          padding: '0 8px',
          backgroundColor: token.colorBgContainer,
          color:
            themeType === 'dark' ? token.colorBgContainer : token.colorBgBlur,
          borderBottom: `solid 1px ${themeType === 'dark' ? '#222' : '#e7e7e7'}`,
          zIndex: 1,
        }}
      >
        <Flex
          gap={3}
          align="center"
          justify="center"
          style={{ height: '100%' }}
        >
          <Button
            icon={<MenuOutlined />}
            type="text"
            onClick={() => dispatch(toggleDrawerStatus())}
          />
          <Typography.Title
            level={5}
            className={styles.customFont}
            style={{ margin: 0, cursor: 'pointer', flexGrow: 1 }}
            onClick={() => navigate('/')}
          >
            Memento Nexus
          </Typography.Title>
          {!loading && scope === 'public' ? (
            <Button
              onClick={() => setScreen((v) => ({ ...v, scope: 'private' }))}
            >
              {me ? 'プライベートへ' : 'ログイン'}
            </Button>
          ) : (
            <Dropdown menu={dropdownProps} placement="bottom" forceRender>
              <Button type="text" style={{ padding: 5 }}>
                {loading ? (
                  <Spin />
                ) : (
                  <>
                    {screenSize.isFullView ? me?.userName : ''}
                    <UserOutlined />
                  </>
                )}
              </Button>
            </Dropdown>
          )}
          <ThemeTypeSwitch />
        </Flex>
      </Layout.Header>
    ),
    [
      dispatch,
      dropdownProps,
      loading,
      me,
      navigate,
      scope,
      screenSize.isFullView,
      setScreen,
      themeType,
      token.colorBgBlur,
      token.colorBgContainer,
    ],
  )
}
