import React from 'react'
import { Menu } from 'antd'
import { useScreenContext } from '@/context/screenContext.ts'
import { useThemeContext } from '@/context/themeContext.ts'
import { getKeys, isIncludes } from '@/utils/types.ts'

export default function ScreenSelectMenu({
  onSelect,
}: {
  onSelect?: (key: string) => void
}) {
  const { theme } = useThemeContext()
  const { screens, screen, setScreen } = useScreenContext()
  const onSelectHandler = (key: string) => {
    if (!isIncludes(getKeys(screens), key)) return
    setScreen((v) => ({
      ...v,
      screen: key,
      queryParam: v.queryParam.filter(([p]) => p === 'userName'),
    }))
    if (onSelect) onSelect(key)
  }
  return (
    <Menu
      theme={theme}
      mode="inline"
      onSelect={(e) => onSelectHandler(e.key)}
      selectedKeys={[screen]}
      style={{
        background: 'transparent',
        border: 'none',
        flexGrow: 1,
        width: '100%',
      }}
      items={getKeys(screens)
        .filter((key) => key === screen || !screens[key].param)
        .map((key) => ({
          key,
          icon: React.createElement(screens[key].icon),
          label: screens[key].label,
        }))}
    />
  )
}
