import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const LOCAL_STORAGE_KEY = 'theme'

type Theme = 'dark' | 'light'
const initialState: Theme =
  (localStorage.getItem(LOCAL_STORAGE_KEY) as 'dark' | 'light') ?? 'dark'

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateTheme: (_, action: PayloadAction<Theme>) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, action.payload)
      return action.payload
    },
  },
})

export const { updateTheme } = themeSlice.actions
export default themeSlice.reducer
