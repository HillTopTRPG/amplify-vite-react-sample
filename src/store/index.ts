import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  useSelector as rawUseSelector,
  type TypedUseSelectorHook,
  useDispatch,
} from 'react-redux'
import drawerStatusSlice from '@/store/drawerStatusSlice.ts'
import scrollMapSlice from '@/store/scrollMapSlice.ts'
import themeSlice from '@/store/themeSlice.ts'
import userAttributesSlice from '@/store/userAttributesSlice.ts'

export const store = configureStore({
  reducer: combineReducers({
    theme: themeSlice,
    drawerStatus: drawerStatusSlice,
    scrollMap: scrollMapSlice,
    userAttributes: userAttributesSlice,
  }),
})

export type RootState = ReturnType<typeof store.getState>

export const themeSelector = (state: RootState) => state.theme
export const drawerStatusSelector = (state: RootState) => state.drawerStatus
export const scrollMapSelector = (state: RootState) => state.scrollMap
export const meSelector = (state: RootState) => state.userAttributes.me
export const currentUserSelector = (state: RootState) =>
  state.userAttributes.currentUser
export const currentIsMeSelector = (state: RootState) =>
  state.userAttributes.currentIsMe
export const usersSelector = (state: RootState) => state.userAttributes.users
export const userAttributesLoadingSelector = (state: RootState) => state.userAttributes.loading

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector

type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
