import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  useSelector as rawUseSelector,
  type TypedUseSelectorHook,
  useDispatch,
} from 'react-redux'
import commonSlice from '@/store/commonSlice.ts'
import drawerStatusSlice from '@/store/drawerStatusSlice.ts'
import nechronicaSlice from '@/store/nechronicaSlice.ts'
import scrollMapSlice from '@/store/scrollMapSlice.ts'
import themeSlice from '@/store/themeSlice.ts'
import userAttributesSlice from '@/store/userAttributesSlice.ts'

export const store = configureStore({
  reducer: combineReducers({
    theme: themeSlice,
    drawerStatus: drawerStatusSlice,
    scrollMap: scrollMapSlice,
    userAttributes: userAttributesSlice,
    common: commonSlice,
    nechronica: nechronicaSlice,
  }),
})

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = rawUseSelector

type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
