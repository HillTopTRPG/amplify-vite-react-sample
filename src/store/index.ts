import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  useSelector as rawUseSelector,
  type TypedUseSelectorHook,
} from 'react-redux'
import themeSlice from '@/store/themeSlice.ts'

export const store = configureStore({
  reducer: combineReducers({
    theme: themeSlice,
  }),
})

export type RootState = ReturnType<typeof store.getState>

export const themeSelector = (state: RootState) => state.theme

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector
