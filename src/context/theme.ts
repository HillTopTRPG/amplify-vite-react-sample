import { useState } from 'react'
import { theme } from 'antd'
import constate from 'constate'
const { defaultAlgorithm, darkAlgorithm } = theme

export const [ThemeProvider, useThemeContext] = constate(() => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const toggleTheme = () => setTheme((v) => (v === 'light' ? 'dark' : 'light'))
  const isDarkMode = theme === 'dark'
  const algorithm = isDarkMode ? darkAlgorithm : defaultAlgorithm
  return { theme, toggleTheme, setTheme, isDarkMode, algorithm }
})
