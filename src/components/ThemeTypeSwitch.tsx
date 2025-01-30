import { MoonFilled, SunFilled } from '@ant-design/icons'
import { Segmented } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectTheme, toggleThemeType } from '@/store/themeSlice.ts'

export default function ThemeTypeSwitch() {
  const themeType = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()

  return (
    <Segmented
      size="small"
      value={themeType}
      onChange={() => dispatch(toggleThemeType())}
      options={[
        { value: 'light', icon: <SunFilled /> },
        { value: 'dark', icon: <MoonFilled /> },
      ]}
      style={{ backgroundColor: '#888', color: 'white' }}
    />
  )
}
