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

export const themeSelector = (state: RootState) => state.theme
export const drawerStatusSelector = (state: RootState) => state.drawerStatus
export const scrollMapSelector = (state: RootState) => state.scrollMap
export const meSelector = (state: RootState) => state.userAttributes.me
export const currentUserSelector = (state: RootState) =>
  state.userAttributes.currentUser
export const currentIsMeSelector = (state: RootState) =>
  state.userAttributes.currentIsMe
export const usersSelector = (state: RootState) => state.userAttributes.users
export const userAttributesLoadingSelector = (state: RootState) =>
  state.userAttributes.loading
export const filterSelector = (state: RootState) => state.userAttributes.filter
export const nechronicaLoadingSelector = (state: RootState) =>
  state.nechronica.loading
export const nechronicaCharactersSelector = (state: RootState) =>
  state.nechronica.characters
export const selectedManeuverInfosSelector = (state: RootState) =>
  state.nechronica.selectedManeuverInfos
export const hoverManeuverIdSelector = (state: RootState) =>
  state.nechronica.hoverManeuverId
export const clickManeuverIdSelector = (state: RootState) =>
  state.nechronica.clickManeuverId
export const characterGroupsSelector = (state: RootState) =>
  state.common.characterGroups
export const nechronicaCharacterGroupRelationsSelector = (state: RootState) =>
  state.nechronica.characterGroupRelations
export const makingNechronicaCharacterSelector = (state: RootState) =>
  state.nechronica.makingNechronicaCharacter
export const makingNechronicaCharacterTypeSelector = (state: RootState) =>
  state.nechronica.makingNechronicaCharacter.additionalData.type
export const makingNechronicaCharacterBaseSelector = (state: RootState) =>
  state.nechronica.makingNechronicaCharacter.sheetData.basic
export const makingNechronicaCharacterManeuverListSelector = (
  state: RootState,
) => state.nechronica.makingNechronicaCharacter.sheetData.maneuverList
export const makingNechronicaCharacterRoiceListSelector = (state: RootState) =>
  state.nechronica.makingNechronicaCharacter.sheetData.roiceList

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector

type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
