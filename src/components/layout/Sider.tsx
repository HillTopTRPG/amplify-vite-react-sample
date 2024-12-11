import { Layout } from 'antd'
import ScreenSelectMenu from '@/components/layout/ScreenSelectMenu.tsx'
import { useScreenContext } from '@/context/screen.ts'
import { useThemeContext } from '@/context/theme.ts'

export default function Sider() {
  const { theme, isDarkMode } = useThemeContext()
  const { open, setOpenStatus } = useScreenContext()
  const onSelect = () => {}
  return (
    <Layout.Sider
      breakpoint="xl"
      theme={theme}
      collapsed={!open}
      onCollapse={(value) => setOpenStatus(!value)}
      style={{
        background: 'transparent',
        borderRight: `solid 1px ${isDarkMode ? '#222' : '#e7e7e7'}`,
      }}
    >
      <ScreenSelectMenu onSelect={onSelect} />
    </Layout.Sider>
  )
}
