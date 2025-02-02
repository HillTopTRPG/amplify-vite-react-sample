import { type Schema } from '@amplify/data/resource.ts'
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { type GetProps } from 'antd'
import { generateClient } from 'aws-amplify/api'
import { getCurrentUser, type GetCurrentUserOutput } from 'aws-amplify/auth'
import type Avatar from 'boring-avatars'
import { type RootState } from '@/store/index.ts'

const client = generateClient<Schema>()

export type User = Schema['User']['type'] & {
  setting: {
    avatarProps: {
      name: string
      variant: GetProps<typeof Avatar>['variant']
      colors: string[]
    }
  }
}

interface State {
  loading: boolean
  user: GetCurrentUserOutput | null
  userStatus: 'yet' | 'loading' | 'done'
  users: User[]
  me: User | null
  currentUser: User | null
  currentIsMe: boolean
  filter: object
}
const initialState: State = {
  loading: true,
  user: null,
  userStatus: 'yet',
  users: [],
  me: null,
  currentUser: null,
  currentIsMe: false,
  filter: {
    public: {
      eq: true,
    },
  },
}

export const fetchCurrentUser = createAsyncThunk(
  'amplifyApi/getCurrentUser',
  getCurrentUser,
)

const slice = createSlice({
  name: 'userAttributes',
  initialState,
  reducers: {
    finishFetch: (
      state,
      action: PayloadAction<
        Pick<State, 'users'> & {
          scope: string
          userName: string | null
        }
      >,
    ) => {
      state.users = action.payload.users

      state.me =
        state.users.find((u) => u.userName === state.user?.username) ?? null

      const { scope, userName } = action.payload
      state.currentUser = userName
        ? (state.users.find((u) => u.userName === userName) ?? null)
        : scope === 'private'
          ? state.me
          : null

      state.currentIsMe =
        Boolean(state.currentUser) &&
        state.currentUser?.userName === state.user?.username

      if (state.me?.userName) {
        state.filter = {
          or: [
            {
              owner: {
                eq: scope === 'private' ? (state.me.userName ?? '') : '',
              },
            },
            {
              public: {
                eq: true,
              },
            },
          ],
        }
      }

      state.loading = false

      // create user record.
      if (state.user && !state.me) {
        // eslint-disable-next-line no-console
        console.log('create user', state.user.username)
        client.models.User.create({
          userName: state.user.username,
          displayName: state.user.username,
          setting: JSON.stringify({
            avatarSrc: state.user.username,
          }),
        })
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.userStatus = 'loading'
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<GetCurrentUserOutput | null>) => {
          state.user = action.payload
          state.userStatus = 'done'
        },
      )
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.userStatus = 'done'
      })
  },
})

export const { finishFetch } = slice.actions

const state =
  <T extends keyof State>(p: T) =>
  (state: RootState) =>
    state.userAttributes[p]
export const selectMe = state('me')
export const selectCurrentUser = state('currentUser')
export const selectCurrentIsMe = state('currentIsMe')
export const selectUsers = state('users')
export const selectUserAttributesLoading = state('loading')
export const selectFilter = state('filter')

export default slice.reducer
