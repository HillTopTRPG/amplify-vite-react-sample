import { createSlice } from '@reduxjs/toolkit'

const LOCAL_STORAGE_KEY = 'theme'

type Theme = 'dark' | 'light'
const initialState: Theme =
  (localStorage.getItem(LOCAL_STORAGE_KEY) as 'dark' | 'light') ?? 'dark'

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state === 'dark' ? 'light' : 'dark'
      localStorage.setItem(LOCAL_STORAGE_KEY, newTheme)
      return newTheme
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
