import React from 'react'
import { Breadcrumb, Flex } from 'antd'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'
import BreadcrumbNode from '@/layouts/MainLayout/BreadcrumbNode.tsx'
import type { Screen } from '@/service'
import { getKeys } from '@/utils/types.ts'

interface Props {
  screens: Record<string, Screen>
}
export default function AppBreadcrumb({ screens }: Props) {
  const { setScreen, screen } = useScreenNavigateInService(screens)
  const indexScreen = screens['index']
  const currentScreen = screens[screen]

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
    </Flex>
  )
}
