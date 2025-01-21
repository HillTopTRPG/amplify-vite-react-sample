import type { Schema } from '@amplify/data/resource.ts'
import { createAction, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { generateClient } from 'aws-amplify/api'
import { useSelector } from 'react-redux'
import { type CharacterGroup } from '@/service'
import { meSelector } from '@/store/index.ts'
import { typedOmit, typedPick } from '@/utils/types.ts'

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

export const createCharacterGroup = createAction<
  Pick<CharacterGroup, 'system' | 'name' | 'characterIds'>
>('common/createCharacterGroup')

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setCharacterGroups: (state, action: PayloadAction<CharacterGroup[]>) => {
      state.characterGroups = action.payload
      state.characterGroupsStatus = 'done'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCharacterGroup, (state, action) => {
      const me = useSelector(meSelector)
      const group = action.payload
      // 重複チェック
      const compare = (cg: CharacterGroup) =>
        (['name'] as const).every((p) => cg[p] === group[p]) &&
        cg.system === group.system &&
        cg.owner === me?.userName
      if (state.characterGroups.some(compare)) return

      client.models.CharacterGroup.create({
        ...typedPick(group, 'name', 'system'),
        additionalData: JSON.stringify({ stared: false }),
        characterIds: JSON.stringify(group.characterIds),
        owner: me?.userName || '',
        public: false,
      })
    })
  },
})

export const { setCharacterGroups } = commonSlice.actions
export default commonSlice.reducer
