import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '@/store/index.ts'

const LOCAL_STORAGE_KEY = 'theme'

type Theme = 'dark' | 'light'
const initialState: Theme =
  (localStorage.getItem(LOCAL_STORAGE_KEY) as 'dark' | 'light') ?? 'dark'

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleThemeType: (state) => {
      const newTheme = state === 'dark' ? 'light' : 'dark'
      localStorage.setItem(LOCAL_STORAGE_KEY, newTheme)
      return newTheme
    },
  },
})

export const { toggleThemeType } = slice.actions

export const selectTheme = (state: RootState) => state.theme

export default slice.reducer
