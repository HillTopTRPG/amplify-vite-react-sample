import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '@/store/index.ts'

const initialState: Record<string, number> = {}

const scrollMapSlice = createSlice({
  name: 'scrollMap',
  initialState,
  reducers: {
    updateScrollMap: (
      state,
      action: PayloadAction<{ key: string; value: number }>,
    ) => {
      state[action.payload.key] = action.payload.value
    },
  },
})

export const { updateScrollMap } = scrollMapSlice.actions

export const selectScrollMap = (state: RootState) => state.scrollMap

export default scrollMapSlice.reducer
