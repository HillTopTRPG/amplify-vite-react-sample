import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: boolean = false

const drawerStatusSlice = createSlice({
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

export const { setDrawerStatus, toggleDrawerStatus } = drawerStatusSlice.actions
export default drawerStatusSlice.reducer
