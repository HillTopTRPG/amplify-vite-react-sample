import React, { useCallback, useMemo } from 'react'
import { Flex, Menu } from 'antd'
import useScreenNavigateInGlobal from '@/hooks/useScreenNavigateInGlobal.ts'
import { useAppSelector } from '@/store'
import { selectTheme } from '@/store/themeSlice.ts'
import { getKeys, isIncludes } from '@/utils/types.ts'

interface Props {
  onSelect?: (key: string) => void
}
export default function ScreenSelectMenu({ onSelect }: Props) {
  const themeType = useAppSelector(selectTheme)
  const { screens, screen, setScreen } = useScreenNavigateInGlobal()

  const onSelectHandler = useCallback(
    (key: string) => {
      if (!isIncludes(getKeys(screens), key)) return
      setScreen((v) => ({
        ...v,
        screen: key,
        queryParam: v.queryParam.filter(([p]) => p === 'userName'),
      }))
      if (onSelect) onSelect(key)
    },
    [onSelect, screens, setScreen],
  )

  return useMemo(
    () => (
      <Menu
        theme={themeType}
        mode="inline"
        onSelect={(e) => onSelectHandler(e.key)}
        selectedKeys={[screen]}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'flex-start',
        }}
        items={getKeys(screens)
          .filter((key) => key === screen || !screens[key].param)
          .map((key) => ({
            key,
            icon: (
              <Flex align="center">
                {React.createElement(screens[key].icon)}
              </Flex>
            ),
            label: screens[key].label,
          }))}
      />
    ),
    [onSelectHandler, screen, screens, themeType],
  )
}
