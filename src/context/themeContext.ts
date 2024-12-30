import { useState } from 'react'
import constate from 'constate'

const LOCAL_STORAGE_KEY = 'theme'

const useTheme = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    (localStorage.getItem(LOCAL_STORAGE_KEY) as 'dark' | 'light') ?? 'dark',
  )

  const updateTheme = (theme: 'dark' | 'light') => {
    localStorage.setItem(LOCAL_STORAGE_KEY, theme)
    setTheme(theme)
  }

  return {
    theme,
    updateTheme,
  }
}

export const [ThemeProvider, useThemeContext] = constate(useTheme)
