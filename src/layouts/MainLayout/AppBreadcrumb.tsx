import React, { useId, useMemo } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Flex, Select, Typography } from 'antd'
import useScreenNavigateInGlobal from '@/hooks/useScreenNavigateInGlobal.ts'
import BreadcrumbNode from '@/layouts/MainLayout/BreadcrumbNode.tsx'
import { useAppSelector } from '@/store'
import { selectMe, selectUsers } from '@/store/userAttributesSlice.ts'
import { getKeys } from '@/utils/types.ts'

export default function AppBreadcrumb() {
  const { scope, userName, screens, setScreen, screen } =
    useScreenNavigateInGlobal()
  const users = useAppSelector(selectUsers)
  const me = useAppSelector(selectMe)
  const indexScreen = screens['index']
  const currentScreen = screens[screen]
  const id = useId()

  const menuProps = {
    items: getKeys(screens)
      .filter((key) => key !== 'index' && !screens[key].param)
      .map((key) => ({
        key,
        label: screens[key].label,
        icon: (
          <Flex align="center">{React.createElement(screens[key].icon)}</Flex>
        ),
      })),
    onClick: ({ key }: { key: string }) =>
      setScreen((v) => ({
        ...v,
        screen: key,
        queryParam: v.queryParam.filter(([p]) => p === 'userName'),
      })),
  }

  const useUsers = useMemo(() => {
    return users
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
  }, [me, scope, users])

  return (
    <Flex vertical align="flex-start" style={{ margin: 8 }}>
      <Breadcrumb
        separator="/"
        params={{}}
        items={[
          {
            title: (
              <BreadcrumbNode
                screen={indexScreen}
                onClick={() =>
                  setScreen((prev) => ({
                    ...prev,
                    screen: 'index',
                  }))
                }
              />
            ),
          },
          ...(screen === 'index'
            ? []
            : [
                {
                  title: currentScreen.label,
                  menu: menuProps,
                },
              ]),
        ]}
      />
      <Flex align="center">
        <label htmlFor={id}>
          <Typography.Text style={{ color: 'gray' }}>表示：</Typography.Text>
        </label>
        <Select
          id={id}
          showSearch
          variant="borderless"
          prefix={<UserOutlined />}
          value={userName ?? (scope === 'public' ? '' : (me?.userName ?? ''))}
          style={{ width: 'auto' }}
          options={[
            ...(scope === 'public'
              ? [{ value: '', label: '全ユーザー', icon: <UserOutlined /> }]
              : []),
            ...useUsers.map((user) => ({
              value: user.userName,
              label: user.viewName,
              icon: <UserOutlined />,
            })),
          ]}
          onChange={(key) => {
            setScreen((v) => {
              const newValue = structuredClone(v)
              const idx = newValue.queryParam.findIndex(
                ([param]) => param === 'userName',
              )
              if (idx >= 0) {
                if (key) {
                  newValue.queryParam.splice(idx, 1, ['userName', key])
                } else {
                  newValue.queryParam.splice(idx, 1)
                }
              } else {
                if (key) {
                  newValue.queryParam.push(['userName', key])
                }
              }
              return newValue
            })
          }}
          placement="bottomLeft"
        />
      </Flex>
    </Flex>
  )
}
