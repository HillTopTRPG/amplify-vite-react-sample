import type { Schema } from '@amplify/data/resource.ts'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { generateClient } from 'aws-amplify/api'
import { type CharacterGroup } from '@/service'
import { type RootState } from '@/store/index.ts'
import { typedOmit } from '@/utils/types.ts'

const client = generateClient<Schema>()

export const updateCharacterGroup = (group: CharacterGroup) => {
  // createdAt, updatedAt は更新しない
  client.models.CharacterGroup.update({
    ...typedOmit(group, 'createdAt', 'updatedAt'),
    additionalData: JSON.stringify(group.additionalData),
    characterIds: JSON.stringify(group.characterIds),
  })
}
export const deleteCharacterGroup = (id: string) => {
  client.models.CharacterGroup.delete({ id })
}

interface State {
  loading: boolean
  characterGroups: CharacterGroup[]
  characterGroupsStatus: 'yet' | 'done'
}

const initialState: State = {
  loading: true,
  characterGroups: [],
  characterGroupsStatus: 'yet',
}

const slice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setCharacterGroups: (state, action: PayloadAction<CharacterGroup[]>) => {
      state.characterGroups = action.payload
      state.characterGroupsStatus = 'done'
      state.loading = false
    },
  },
})

export const { setCharacterGroups } = slice.actions

export const selectCharacterGroups = (state: RootState) =>
  state.common.characterGroups
export const selectCommonLoading = (state: RootState) => state.common.loading

export default slice.reducer
