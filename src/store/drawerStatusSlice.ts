import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '@/store/index.ts'

const initialState: boolean = false

const slice = createSlice({
  name: 'drawerStatus',
  initialState,
  reducers: {
    setDrawerStatus: (_, action: PayloadAction<boolean>) => {
      return action.payload
    },
    toggleDrawerStatus: (state) => {
      return !state
    },
  },
})

export const { setDrawerStatus, toggleDrawerStatus } = slice.actions

export const selectDrawerStatus = (state: RootState) => state.drawerStatus

export default slice.reducer
