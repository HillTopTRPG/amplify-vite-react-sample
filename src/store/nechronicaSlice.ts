import type { Schema } from '@amplify/data/resource.ts'
import {
  type Nechronica,
  type NechronicaAdditionalData,
  type NechronicaBasic,
  type NechronicaCharacter,
  type NechronicaManeuver,
  type NechronicaRoice,
  type NechronicaType,
} from '@higanbina/ts/NechronicaDataHelper.ts'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { generateClient } from 'aws-amplify/api'
import { type RootState } from '@/store/index.ts'
import { simpleReducer } from '@/store/util.ts'
import { type OnlyTypeKey, typedOmit } from '@/utils/types.ts'

const client = generateClient<Schema>()

const INITIAL_NECHRONICA_CHARACTER: NechronicaCharacter = {
  id: '',
  name: '',
  additionalData: {
    type: 'doll',
    sheetId: '',
    stared: false,
  },
  sheetData: {
    basic: {
      position: 0,
      mainClass: 0,
      subClass: 0,
      bonusStatus: 'armed',
      affection: {
        armed: '',
        mutation: '',
        modification: '',
      },
      characterName: '',
      shuzoku: '',
      age: '',
      basePosition: 0,
      height: '',
      weight: '',
      carma: '',
      hairColor: '',
      eyeColor: '',
      skinColor: '',
    },
    maneuverList: [],
    roiceList: [],
  },
  owner: '-',
  public: false,
  createdAt: '',
  updatedAt: '',
}

const INITIAL_NECHRONICA_MANEUVER: NechronicaManeuver = {
  lost: false,
  used: false,
  type: 0,
  parts: 0,
  name: '名無し',
  timing: 0,
  cost: '',
  range: '',
  memo: '',
  shozoku: '',
  ignoreBravado: false,
  isBravado: false,
  isUnknown: false,
  isAdded: true,
}

const INITIAL_NECHRONICA_ROICE: NechronicaRoice = {
  id: 1,
  name: '名無し',
  damage: 0,
  memo: '',
}

export const updateNechronicaCharacter = (character: NechronicaCharacter) => {
  // createdAt, updatedAt は更新しない
  client.models.NechronicaCharacter.update({
    ...typedOmit(character, 'createdAt', 'updatedAt'),
    name: character.sheetData.basic.characterName,
    additionalData: JSON.stringify(character.additionalData),
    sheetData: JSON.stringify(character.sheetData),
  })
}
export const deleteNechronicaCharacter = (id: string) => {
  client.models.NechronicaCharacter.delete({ id })
}

export type ManeuverInfo = {
  maneuver: NechronicaManeuver
  maneuverIndex: number
  character: NechronicaCharacter
  iconClass: string
}

export const getManeuverInfoKey = (info: ManeuverInfo) =>
  `${info.character.id}-${info.maneuverIndex}`

interface State {
  loading: boolean
  characters: NechronicaCharacter[]
  charactersStatus: 'yet' | 'done'
  hoverManeuverId: string
  clickManeuverId: string
  selectedManeuverInfos: ManeuverInfo[]
  makingCharacter: NechronicaCharacter
}

const initialState: State = {
  loading: true,
  characters: [],
  charactersStatus: 'yet',
  hoverManeuverId: '',
  clickManeuverId: '',
  selectedManeuverInfos: [],
  makingCharacter: structuredClone(INITIAL_NECHRONICA_CHARACTER),
}

const updateListData = <
  T extends 'maneuverList' | 'roiceList',
  V extends Nechronica[T][number],
>(
  property: T,
) => {
  return (state: State, action: PayloadAction<{ index: number; data: V }>) => {
    state.makingCharacter.sheetData[property][action.payload.index] =
      action.payload.data
  }
}

const deleteListData = (property: 'maneuverList' | 'roiceList') => {
  return (state: State, action: PayloadAction<number>) => {
    const character = state.makingCharacter
    character.sheetData = {
      ...character.sheetData,
      [property]: character.sheetData[property].filter(
        (_, index) => index !== action.payload,
      ),
    }
  }
}

const slice = createSlice({
  name: 'nechronica',
  initialState,
  reducers: {
    setNechronicaCharacters: (
      state,
      action: PayloadAction<NechronicaCharacter[]>,
    ) => {
      state.characters = action.payload
      state.charactersStatus = 'done'
      state.loading = false
    },
    setHoverManeuverId: simpleReducer('hoverManeuverId'),
    setClickManeuverId: simpleReducer('clickManeuverId'),
    setSelectedManeuverInfos: simpleReducer('selectedManeuverInfos'),
    addSelectedManeuverInfo: (state, action) => {
      state.selectedManeuverInfos.push(action.payload)
    },
    removeSelectedManeuverInfo: (
      state,
      action: PayloadAction<ManeuverInfo>,
    ) => {
      const idx = state.selectedManeuverInfos.findIndex(
        (d) => getManeuverInfoKey(d) === getManeuverInfoKey(action.payload),
      )
      state.selectedManeuverInfos.splice(idx, 1)
    },
    setMakingCharacterType: (state, action: PayloadAction<NechronicaType>) => {
      state.makingCharacter.additionalData.type = action.payload
    },
    setMakingBasicData: (
      state: State,
      action: PayloadAction<
        | {
            property: OnlyTypeKey<NechronicaBasic, string>
            value: string
          }
        | {
            property: OnlyTypeKey<NechronicaBasic, number>
            value: number
          }
      >,
    ) => {
      const sheetData = state.makingCharacter.sheetData
      sheetData.basic = {
        ...sheetData.basic,
        [action.payload.property]: action.payload.value,
      }
    },
    setMakingBonusStatus: (
      state: State,
      action: PayloadAction<NechronicaBasic['bonusStatus']>,
    ) => {
      state.makingCharacter.sheetData.basic.bonusStatus = action.payload
    },
    setMakingAffection: (
      state: State,
      action: PayloadAction<{
        property: keyof NechronicaBasic['affection']
        value: string
      }>,
    ) => {
      const basic = state.makingCharacter.sheetData.basic
      basic.affection[action.payload.property] = action.payload.value
    },
    addMakingManeuver: (
      state,
      action: PayloadAction<NechronicaManeuver | undefined>,
    ) => {
      const list = state.makingCharacter.sheetData.maneuverList
      list.push(action.payload ?? structuredClone(INITIAL_NECHRONICA_MANEUVER))
    },
    updateMakingManeuver: updateListData('maneuverList'),
    deleteMakingManeuver: deleteListData('maneuverList'),
    addMakingRoice: (
      state,
      action: PayloadAction<NechronicaRoice | undefined>,
    ) => {
      const list = state.makingCharacter.sheetData.roiceList
      list.push(action?.payload ?? structuredClone(INITIAL_NECHRONICA_ROICE))
    },
    updateMakingRoice: updateListData('roiceList'),
    deleteMakingRoice: deleteListData('roiceList'),
  },
})

export const {
  setNechronicaCharacters,
  setHoverManeuverId,
  setClickManeuverId,
  setSelectedManeuverInfos,
  addSelectedManeuverInfo,
  removeSelectedManeuverInfo,
  setMakingCharacterType,
  setMakingBasicData,
  setMakingBonusStatus,
  setMakingAffection,
  addMakingManeuver,
  updateMakingManeuver,
  addMakingRoice,
  updateMakingRoice,
  deleteMakingRoice,
} = slice.actions

const state =
  <T extends keyof State>(p: T) =>
  (state: RootState) =>
    state.nechronica[p]
export const selectNechronicaLoading = state('loading')
export const selectNechronicaCharacters = state('characters')
export const selectSelectedManeuverInfos = state('selectedManeuverInfos')
export const selectHoverManeuverId = state('hoverManeuverId')
export const selectClickManeuverId = state('clickManeuverId')
export const selectMakingCharacter = state('makingCharacter')
const additionalData =
  <T extends keyof NechronicaAdditionalData>(p: T) =>
  (state: RootState) =>
    state.nechronica.makingCharacter.additionalData[p]
export const selectMakingCharacterType = additionalData('type')
const sheetData =
  <T extends keyof Nechronica>(p: T) =>
  (state: RootState) =>
    state.nechronica.makingCharacter.sheetData[p]
export const selectMakingCharacterBase = sheetData('basic')
export const selectMakingCharacterManeuverList = sheetData('maneuverList')
export const selectMakingCharacterRoiceList = sheetData('roiceList')

export default slice.reducer
