import React from 'react'
import { Menu } from 'antd'
import { useScreenContext } from '@/context/screen.ts'
import { useThemeContext } from '@/context/theme.ts'
import { getKeys, isIncludes } from '@/utils/types.ts'

export default function ScreenSelectMenu({
  onSelect,
}: {
  onSelect: (key: string) => void
}) {
  const { theme } = useThemeContext()
  const { screens, screen, setScreen } = useScreenContext()
  const onSelectHandler = (key: string) => {
    if (!isIncludes(getKeys(screens), key)) return
    setScreen(key)
    onSelect(key)
  }
  return (
    <Menu
      theme={theme}
      mode="inline"
      onSelect={({ key }) => onSelectHandler(key)}
      defaultSelectedKeys={[screen]}
      style={{
        background: 'transparent',
        border: 'none',
        flexGrow: 1,
        width: '100%',
      }}
      items={getKeys(screens).map((key) => ({
        key,
        icon: React.createElement(screens[key].icon),
        label: screens[key].label,
      }))}
    />
  )
}
