import {
  type Nechronica,
  type NechronicaAdditionalData,
  type NechronicaBasic,
  type NechronicaCharacter,
  type NechronicaDataHelper,
  type NechronicaManeuver,
  type NechronicaRoice,
  type NechronicaType,
} from '@Nechronica/ts/NechronicaDataHelper.ts'
import type { Schema } from '@amplify/data/resource.ts'
import { createAction, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { generateClient } from 'aws-amplify/api'
import { useSelector } from 'react-redux'
import { type CharacterGroup } from '@/service'
import { meSelector } from '@/store/index.ts'
import { type OnlyTypeKey, type PromiseType, typedOmit } from '@/utils/types.ts'

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

type CharacterGroupRelation = CharacterGroup & {
  characters: NechronicaCharacter[]
}

interface State {
  loading: boolean
  characters: NechronicaCharacter[]
  charactersStatus: 'yet' | 'done'
  hoverManeuverId: string
  clickManeuverId: string
  selectedManeuverInfos: ManeuverInfo[]
  characterGroupRelations: CharacterGroupRelation[]
  characterGroupRelationsStatus: 'yet' | 'done'
  makingNechronicaCharacter: NechronicaCharacter
}

const initialState: State = {
  loading: true,
  characters: [],
  charactersStatus: 'yet',
  hoverManeuverId: '',
  clickManeuverId: '',
  selectedManeuverInfos: [],
  characterGroupRelations: [],
  characterGroupRelationsStatus: 'yet',
  makingNechronicaCharacter: structuredClone(INITIAL_NECHRONICA_CHARACTER),
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

export const createNechronicaCharacter = createAction<
  NonNullable<PromiseType<ReturnType<typeof NechronicaDataHelper.fetch>>>
>('nechronica/createCharacter')

const nechronicaSlice = createSlice({
  name: 'nechronica',
  initialState,
  reducers: {
    setNechronicaCharacters: (
      state,
      action: PayloadAction<NechronicaCharacter[]>,
    ) => {
      state.characters = action.payload
      state.charactersStatus = 'done'
      if (state.characterGroupRelationsStatus === 'done') {
        state.loading = false
      }
    },
    setNechronicaCharacterGroupRelations: (
      state,
      action: PayloadAction<CharacterGroupRelation[]>,
    ) => {
      state.characterGroupRelations = action.payload
      state.characterGroupRelationsStatus = 'done'
      if (state.charactersStatus === 'done') {
        state.loading = false
      }
    },
    setHoverManeuverId: (state, action: PayloadAction<string>) => {
      state.hoverManeuverId = action.payload
    },
    setClickManeuverId: (state, action: PayloadAction<string>) => {
      state.clickManeuverId = action.payload
    },
    setSelectedManeuverInfos: (
      state,
      action: PayloadAction<ManeuverInfo[]>,
    ) => {
      state.selectedManeuverInfos = action.payload
    },
    addSelectedManeuverInfo: (state, action: PayloadAction<ManeuverInfo>) => {
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
      state.makingNechronicaCharacter.additionalData.type = action.payload
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
      const sheetData = state.makingNechronicaCharacter.sheetData
      sheetData.basic = {
        ...sheetData.basic,
        [action.payload.property]: action.payload.value,
      }
    },
    setMakingBonusStatus: (
      state: State,
      action: PayloadAction<NechronicaBasic['bonusStatus']>,
    ) => {
      state.makingNechronicaCharacter.sheetData.basic.bonusStatus =
        action.payload
    },
    setMakingAffection: (
      state: State,
      action: PayloadAction<{
        property: keyof NechronicaBasic['affection']
        value: string
      }>,
    ) => {
      const basic = state.makingNechronicaCharacter.sheetData.basic
      basic.affection[action.payload.property] = action.payload.value
    },
    addMakingManeuver: (
      state,
      action: PayloadAction<NechronicaManeuver | undefined>,
    ) => {
      const list = state.makingNechronicaCharacter.sheetData.maneuverList
      list.push(action.payload ?? structuredClone(INITIAL_NECHRONICA_MANEUVER))
    },
    updateMakingManeuver: updateListData('maneuverList'),
    deleteMakingManeuver: deleteListData('maneuverList'),
    addMakingRoice: (
      state,
      action: PayloadAction<NechronicaRoice | undefined>,
    ) => {
      const list = state.makingNechronicaCharacter.sheetData.roiceList
      list.push(action?.payload ?? structuredClone(INITIAL_NECHRONICA_ROICE))
    },
    updateMakingRoice: updateListData('roiceList'),
    deleteMakingRoice: deleteListData('roiceList'),
  },
  extraReducers: (builder) => {
    builder.addCase(createNechronicaCharacter, (state, action) => {
      const me = useSelector(meSelector)
      const character = action.payload
      // 重複チェック
      const compare = (c: NechronicaCharacter) =>
        (['type', 'sheetId'] as const).every(
          (p) => c.additionalData[p] === character.additionalData[p],
        ) && c.owner === me?.userName
      if (state.characters.some(compare)) return

      const additionalData: NechronicaAdditionalData = {
        ...character.additionalData,
        stared: false,
      }

      client.models.NechronicaCharacter.create({
        name: character.sheetData.basic.characterName,
        additionalData: JSON.stringify(additionalData),
        sheetData: JSON.stringify(character.sheetData),
        owner: me?.userName || '',
        public: false,
      })
    })
  },
})

export const {
  setNechronicaCharacters,
  setHoverManeuverId,
  setClickManeuverId,
  setSelectedManeuverInfos,
  addSelectedManeuverInfo,
  removeSelectedManeuverInfo,
  setNechronicaCharacterGroupRelations,
  setMakingCharacterType,
  setMakingBasicData,
  setMakingBonusStatus,
  setMakingAffection,
  addMakingManeuver,
  updateMakingManeuver,
  addMakingRoice,
  updateMakingRoice,
  deleteMakingRoice,
} = nechronicaSlice.actions
export default nechronicaSlice.reducer
