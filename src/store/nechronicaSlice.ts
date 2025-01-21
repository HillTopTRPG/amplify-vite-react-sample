import {
  type NechronicaAdditionalData,
  type NechronicaCharacter,
  type NechronicaDataHelper,
  type NechronicaManeuver,
} from '@Nechronica/ts/NechronicaDataHelper.ts'
import type { Schema } from '@amplify/data/resource.ts'
import { createAction, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { generateClient } from 'aws-amplify/api'
import { useSelector } from 'react-redux'
import { type CharacterGroup } from '@/service'
import { meSelector } from '@/store/index.ts'
import { type PromiseType, typedOmit } from '@/utils/types.ts'

const client = generateClient<Schema>()

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
      state.selectedManeuverInfos = [
        action.payload,
        ...state.selectedManeuverInfos,
      ]
    },
    removeSelectedManeuverInfo: (
      state,
      action: PayloadAction<ManeuverInfo>,
    ) => {
      state.selectedManeuverInfos = state.selectedManeuverInfos.filter(
        (d) =>
          `${d.character.id}-${d.maneuverIndex}` !==
          `${action.payload.character.id}-${action.payload.maneuverIndex}`,
      )
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
} = nechronicaSlice.actions
export default nechronicaSlice.reducer
