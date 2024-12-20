import { Layout } from 'antd'
import ScreenSelectMenu from '@/components/layout/ScreenSelectMenu.tsx'
import { useScreenContext } from '@/context/screen.ts'
import { useUserAttributes } from '@/context/userAttributes.ts'

export default function Sider() {
  const { theme, isDarkMode } = useUserAttributes()
  const { open } = useScreenContext()
  const onSelect = () => {}
  return (
    <Layout.Sider
      breakpoint="xl"
      collapsedWidth={50}
      width={200}
      theme={theme}
      collapsed={!open}
      style={{
        background: 'transparent',
        borderRight: `solid 1px ${isDarkMode ? '#222' : '#e7e7e7'}`,
      }}
    >
      <ScreenSelectMenu onSelect={onSelect} />
    </Layout.Sider>
  )
}
