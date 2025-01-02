import React from 'react'
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
  theme as AntdTheme,
  Button,
  Layout,
  Flex,
  Typography,
  Dropdown,
  type MenuProps,
  Space,
  Spin,
} from 'antd'
import MediaQuery from 'react-responsive'
import { MEDIA_QUERY } from '@/const/style.ts'
import { useScreenContext } from '@/context/screenContext.ts'
import { useServicesContext } from '@/context/servicesContext.ts'
import { useThemeContext } from '@/context/themeContext.ts'
import { useUserAttributes } from '@/context/userAttributesContext.ts'
import { getKeys, isProperty } from '@/utils/types.ts'

export default function AppMenu() {
  const { users, me, loading } = useUserAttributes()
  const { theme, updateTheme } = useThemeContext()
  const { services } = useServicesContext()
  const { screenSize } = useScreenContext()

  const {
    scope,
    userName,
    service,
    setService,
    screenIcon,
    screenLabel,
    toggleOpenStatus,
    screens,
    setScreen,
  } = useScreenContext()

  const { token } = AntdTheme.useToken()
  const { signOut } = useAuthenticator()
  const navigate = useNavigate()

  const serviceName = isProperty(service, services)
    ? services[service].serviceName
    : 'unknown'

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

  const useUsers = users
    ? (me
        ? [me, ...users.filter((u) => u.userName !== me?.userName)]
        : [...users]
      ).map((user) => ({
        ...user,
        viewName:
          user.userName === me?.userName && scope === 'private'
            ? 'あなた'
            : user.userName,
      }))
    : []

  return (
    <Layout.Header
      style={{
        height: '3rem',
        lineHeight: '3rem',
        padding: '0 8px',
        background: 'transparent',
        color: theme === 'dark' ? token.colorBgContainer : token.colorBgBlur,
        borderBottom: `solid 1px ${theme === 'dark' ? '#222' : '#e7e7e7'}`,
        zIndex: 1,
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
          />
          <Typography.Text>/</Typography.Text>
          <Dropdown
            menu={{
              items: [
                scope === 'public'
                  ? { key: '', label: '全ユーザー', icon: <UserOutlined /> }
                  : null,
                ...useUsers.map((user) => ({
                  key: user.userName,
                  label: user.viewName,
                  icon: <UserOutlined />,
                })),
              ].filter((v) => v),
              onClick: ({ key }) =>
                setScreen((v) => ({
                  ...v,
                  queryParam: [
                    ['userName', key],
                    ...v.queryParam.filter(([p]) => p !== 'userName'),
                  ],
                })),
            }}
            placement="bottomLeft"
          >
            <Button
              type="text"
              icon={<UserOutlined />}
              style={{ padding: '0 5px' }}
            >
              {useUsers.find((u) => u.userName === userName)?.viewName ??
                (scope === 'private' ? 'あなた' : '全ユーザー')}
            </Button>
          </Dropdown>
          <Typography.Text>/</Typography.Text>
          <Dropdown
            menu={{
              items: getKeys(services).map((key) => ({
                key,
                label: services[key].serviceName,
                icon: <BookOutlined />,
              })),
              onClick: ({ key }) => setService(services, key),
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
                items: getKeys(screens)
                  .filter((key) => !screens[key].param)
                  .map((key) => ({
                    key,
                    label: screens[key].label,
                    icon: React.createElement(screens[key].icon),
                  })),
                onClick: ({ key }) =>
                  setScreen((v) => ({
                    ...v,
                    screen: key,
                    queryParam: v.queryParam.filter(([p]) => p === 'userName'),
                  })),
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
        <Button
          type="text"
          icon={theme === 'dark' ? <MoonFilled /> : <SunFilled />}
          onClick={() => updateTheme(theme === 'dark' ? 'light' : 'dark')}
          size="middle"
        />
      </Flex>
    </Layout.Header>
  )
}
