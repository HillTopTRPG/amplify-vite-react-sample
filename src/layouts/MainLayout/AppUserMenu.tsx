import { Menu } from 'antd'
import Avatar from 'boring-avatars'
import { useAppSelector } from '@/store'
import { selectTheme } from '@/store/themeSlice.ts'
import { selectMe } from '@/store/userAttributesSlice.ts'

export default function AppUserMenu() {
  const themeType = useAppSelector(selectTheme)
  const me = useAppSelector(selectMe)
  if (!me) return null

  const onSelectHandler = (key: string) => {
    if (me.userName !== key) return
    console.log(key)
  }

  return (
    <Menu
      theme={themeType}
      mode="inline"
      onSelect={(e) => onSelectHandler(e.key)}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'flex-start',
      }}
      items={[
        {
          key: me.userName,
          icon: <Avatar {...me.setting.avatarProps} size={16} />,
          label: me.userName,
        },
      ]}
    />
  )
}
