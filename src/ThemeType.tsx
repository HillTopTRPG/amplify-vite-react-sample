import { type ReactNode, useMemo } from 'react'
import { ConfigProvider, theme } from 'antd'
import { useAppSelector } from '@/store'
import { selectTheme } from '@/store/themeSlice.ts'

const { defaultAlgorithm, darkAlgorithm } = theme

interface Props {
  children: ReactNode
}
export default function ThemeType({ children }: Props) {
  const themeType = useAppSelector(selectTheme)
  const algorithm = themeType === 'dark' ? darkAlgorithm : defaultAlgorithm

  return useMemo(
    () => (
      <ConfigProvider
        theme={{ algorithm }}
        divider={{ style: { margin: '5px 0' } }}
      >
        {children}
      </ConfigProvider>
    ),
    [algorithm, children],
  )
}
