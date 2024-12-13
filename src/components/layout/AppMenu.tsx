import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  MoonFilled,
  SunFilled,
  UserOutlined,
} from '@ant-design/icons'
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
import {
  fetchUserAttributes,
  type FetchUserAttributesOutput,
} from 'aws-amplify/auth'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import { MEDIA_QUERY } from '@/const/style.ts'
import { useScreenContext } from '@/context/screen.ts'
import { useThemeContext } from '@/context/theme.ts'
import { type Screens } from '@/layouts/MainContentsLauout.tsx'
import services from '@/service'
import { getKeys, isProperty } from '@/utils/types.ts'

export default function AppMenu() {
  const [attr, setAttrResult] = useState<FetchUserAttributesOutput>()
  const [loading, setLoading] = useState<boolean>(true)

  const { service, setService, screenIcon, screenLabel, toggleOpenStatus } =
    useScreenContext()
  const { token } = theme.useToken()
  const { signOut } = useAuthenticator()
  const { isDarkMode, toggleTheme } = useThemeContext()
  const { screens, setScreen } = useScreenContext()
  const navigate = useNavigate()

  useEffect(() => {
    fetchUserAttributes()
      .then(setAttrResult)
      .then(() => setLoading(false))
  }, [])

  const serviceName = isProperty(service, services)
    ? services[service].serviceName
    : 'unknown'

  const isFullView = useMediaQuery(MEDIA_QUERY.FULL_VIEW)

  const dropdownProps: MenuProps = {
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
  }

  return (
    <Layout.Header
      style={{
        height: '3rem',
        lineHeight: '3rem',
        padding: '0 8px',
        background: 'transparent',
        color: isDarkMode ? token.colorBgContainer : token.colorBgBlur,
        borderBottom: `solid 1px ${isDarkMode ? '#222' : '#e7e7e7'}`,
      }}
    >
      <Flex
        gap={3}
        align="center"
        justify="center"
        style={{
          height: '100%',
        }}
      >
        <Button
          icon={<MenuOutlined />}
          type="text"
          onClick={toggleOpenStatus}
        />
        <Flex align="center" justify="flex-start" style={{ flexGrow: 1 }}>
          <Button
            type="text"
            icon={<HomeOutlined />}
            onClick={() => navigate('/')}
            style={{ padding: '0 5px' }}
          >
            {isFullView ? 'Amplify-Vite-React-Sample' : null}
          </Button>
          <Typography.Text>/</Typography.Text>
          <Dropdown
            menu={{
              items: getKeys(services).map((key) => ({
                key,
                label: services[key].serviceName,
                icon: <BookOutlined />,
              })),
              onClick: ({ key }) => setService(key),
            }}
            placement="bottomLeft"
          >
            <Button
              type="text"
              icon={<BookOutlined />}
              style={{ padding: '0 5px' }}
            >
              {serviceName}
            </Button>
          </Dropdown>
          <MediaQuery {...MEDIA_QUERY.PC}>
            <Typography.Text>/</Typography.Text>
            <Dropdown
              menu={{
                items: getKeys(screens).map((key) => ({
                  key,
                  label: screens[key].label,
                  icon: React.createElement(screens[key].icon),
                })),
                onClick: ({ key }) => setScreen(key as keyof Screens),
              }}
              placement="bottomLeft"
            >
              <Button type="text" style={{ padding: '0 5px' }}>
                {React.createElement(screenIcon)}
                <Typography.Text>{screenLabel}</Typography.Text>
              </Button>
            </Dropdown>
          </MediaQuery>
        </Flex>
        <Dropdown menu={dropdownProps} placement="bottom" forceRender>
          <Button type="text" style={{ padding: 5 }}>
            {loading ? (
              <Spin />
            ) : (
              <>
                <UserOutlined />
                <Typography.Text>
                  {attr?.preferred_username || '-'}
                </Typography.Text>
              </>
            )}
          </Button>
        </Dropdown>
        <Button
          type="text"
          icon={isDarkMode ? <MoonFilled /> : <SunFilled />}
          onClick={toggleTheme}
          size="middle"
        />
      </Flex>
    </Layout.Header>
  )
}
