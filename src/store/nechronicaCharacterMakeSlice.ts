import {
  type Nechronica,
  type NechronicaBasic,
  type NechronicaCharacter,
  type NechronicaManeuver,
  type NechronicaRoice,
  type NechronicaType,
} from '@Nechronica/ts/NechronicaDataHelper.ts'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type OnlyTypeKey } from '@/utils/types.ts'

interface State {
  makingNechronicaCharacter: NechronicaCharacter
}

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

const setBasicData = <T>(property: OnlyTypeKey<NechronicaBasic, T>) => {
  return (state: State, action: PayloadAction<T>) => {
    const sheetData = state.makingNechronicaCharacter.sheetData
    sheetData.basic = { ...sheetData.basic, [property]: action.payload }
  }
}

const addListData = <
  T extends 'maneuverList' | 'roiceList',
  V extends Nechronica[T][number],
>(
  property: T,
  initialData: V,
) => {
  return (state: State, action: PayloadAction<V | undefined>) => {
    const character = state.makingNechronicaCharacter
    character.sheetData = {
      ...character.sheetData,
      [property]: [
        ...character.sheetData[property],
        action.payload ?? structuredClone(initialData),
      ],
    }
  }
}

const updateListData = <
  T extends 'maneuverList' | 'roiceList',
  V extends Nechronica[T][number],
>(
  property: T,
) => {
  return (state: State, action: PayloadAction<{ index: number; data: V }>) => {
    state.makingNechronicaCharacter.sheetData[property][action.payload.index] =
      action.payload.data
  }
}

const deleteListData = (property: 'maneuverList' | 'roiceList') => {
  return (state: State, action: PayloadAction<number>) => {
    const character = state.makingNechronicaCharacter
    character.sheetData = {
      ...character.sheetData,
      [property]: character.sheetData[property].filter(
        (_, index) => index !== action.payload,
      ),
    }
  }
}

const initialState: State = {
  makingNechronicaCharacter: INITIAL_NECHRONICA_CHARACTER,
}

const nechronicaCharacterMakeSlice = createSlice({
  name: 'nechronicaCharacterMake',
  initialState,
  reducers: {
    setMakingNechronicaCharacterType: (
      state,
      action: PayloadAction<NechronicaType>,
    ) => {
      state.makingNechronicaCharacter.additionalData.type = action.payload
    },
    setMakingNechronicaPosition: setBasicData<number>('position'),
    setMakingNechronicaMainClass: setBasicData<number>('mainClass'),
    setMakingNechronicaSubClass: setBasicData<number>('subClass'),
    setMakingNechronicaBonusStatus:
      setBasicData<NechronicaBasic['bonusStatus']>('bonusStatus'),
    setMakingNechronicaAffection: (
      state: State,
      action: PayloadAction<{
        property: keyof NechronicaBasic['affection']
        value: string
      }>,
    ) => {
      const basic = state.makingNechronicaCharacter.sheetData.basic
      basic.affection = {
        ...basic.affection,
        [action.payload.property]: action.payload.value,
      }
    },
    setMakingNechronicaCharacterName: setBasicData<string>('characterName'),
    setMakingNechronicaShuzoku: setBasicData<string>('shuzoku'),
    setMakingNechronicaAge: setBasicData<string>('age'),
    setMakingNechronicaBasePosition: setBasicData<number>('basePosition'),
    setMakingNechronicaHeight: setBasicData<string>('height'),
    setMakingNechronicaWeight: setBasicData<string>('weight'),
    setMakingNechronicaCarma: setBasicData<string>('carma'),
    setMakingNechronicaHairColor: setBasicData<string>('hairColor'),
    setMakingNechronicaEyeColor: setBasicData<string>('eyeColor'),
    setMakingNechronicaSkinColor: setBasicData<string>('skinColor'),
    addMakingNechronicaManeuver: addListData(
      'maneuverList',
      INITIAL_NECHRONICA_MANEUVER,
    ),
    updateMakingNechronicaManeuver: updateListData('maneuverList'),
    deleteMakingNechronicaManeuver: deleteListData('maneuverList'),
    addMakingNechronicaRoice: addListData(
      'roiceList',
      INITIAL_NECHRONICA_ROICE,
    ),
    updateMakingNechronicaRoice: updateListData('roiceList'),
    deleteMakingNechronicaRoice: deleteListData('roiceList'),
  },
})

export const {
  setMakingNechronicaCharacterType,
  setMakingNechronicaPosition,
  setMakingNechronicaMainClass,
  setMakingNechronicaSubClass,
  setMakingNechronicaBonusStatus,
  setMakingNechronicaAffection,
  setMakingNechronicaCharacterName,
  setMakingNechronicaShuzoku,
  setMakingNechronicaAge,
  setMakingNechronicaBasePosition,
  setMakingNechronicaHeight,
  setMakingNechronicaWeight,
  setMakingNechronicaCarma,
  setMakingNechronicaHairColor,
  setMakingNechronicaEyeColor,
  setMakingNechronicaSkinColor,
  addMakingNechronicaManeuver,
  updateMakingNechronicaManeuver,
  deleteMakingNechronicaManeuver,
  addMakingNechronicaRoice,
  updateMakingNechronicaRoice,
  deleteMakingNechronicaRoice,
} = nechronicaCharacterMakeSlice.actions
export default nechronicaCharacterMakeSlice.reducer
