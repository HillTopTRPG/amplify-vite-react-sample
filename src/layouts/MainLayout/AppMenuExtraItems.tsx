import { Menu } from 'antd'
import Avatar from 'boring-avatars'
import useScreenNavigateInGlobal from '@/hooks/useScreenNavigateInGlobal.ts'
import { useAppSelector } from '@/store'
import { selectTheme } from '@/store/themeSlice.ts'
import { selectMe } from '@/store/userAttributesSlice.ts'

export default function AppMenuExtraItems() {
  const themeType = useAppSelector(selectTheme)
  const me = useAppSelector(selectMe)
  const { screen, setScreen } = useScreenNavigateInGlobal()
  if (!me) return null

  const onSelectHandler = () => {
    setScreen((v) => ({
      ...v,
      screen: 'profile',
      queryParam: [],
    }))
  }

  return (
    <Menu
      theme={themeType}
      mode="inline"
      onSelect={onSelectHandler}
      selectedKeys={[screen]}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
      }}
      items={[
        {
          key: 'profile',
          icon: <Avatar {...me.setting.avatarProps} size={16} />,
          label: me.userName,
        },
      ]}
    />
  )
}
