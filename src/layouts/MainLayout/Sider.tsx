import { Layout } from 'antd'
import ScreenSelectMenu from './ScreenSelectMenu.tsx'
import { useScreenContext } from '@/context/screenContext.ts'
import { useThemeContext } from '@/context/themeContext.ts'

export default function Sider() {
  const { theme } = useThemeContext()
  const { open } = useScreenContext()

  return (
    <Layout.Sider
      breakpoint="xl"
      collapsedWidth={50}
      width={200}
      theme={theme}
      collapsed={!open}
      style={{
        background: 'transparent',
        borderRight: `solid 1px ${theme === 'dark' ? '#222' : '#e7e7e7'}`,
      }}
    >
      <ScreenSelectMenu />
    </Layout.Sider>
  )
}
