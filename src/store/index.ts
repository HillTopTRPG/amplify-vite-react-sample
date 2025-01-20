import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  useSelector as rawUseSelector,
  type TypedUseSelectorHook,
} from 'react-redux'
import drawerStatusSlice from '@/store/drawerStatusSlice.ts'
import scrollMapSlice from '@/store/scrollMapSlice.ts'
import themeSlice from '@/store/themeSlice.ts'

export const store = configureStore({
  reducer: combineReducers({
    theme: themeSlice,
    drawerStatus: drawerStatusSlice,
    scrollMap: scrollMapSlice,
  }),
})

export type RootState = ReturnType<typeof store.getState>

export const themeSelector = (state: RootState) => state.theme
export const drawerStatusSelector = (state: RootState) => state.drawerStatus
export const scrollMapSelector = (state: RootState) => state.scrollMap

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector
