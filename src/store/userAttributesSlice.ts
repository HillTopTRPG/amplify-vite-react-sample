import { type Schema } from '@amplify/data/resource.ts'
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { generateClient } from 'aws-amplify/api'
import {
  fetchUserAttributes,
  type FetchUserAttributesOutput,
  getCurrentUser,
  type GetCurrentUserOutput,
} from 'aws-amplify/auth'

const client = generateClient<Schema>()

type User = Schema['User']['type'] & {
  setting: {
    darkMode: boolean
  }
}

interface State {
  attr: FetchUserAttributesOutput | undefined
  loading: boolean
  attrStatus: 'yet' | 'loading' | 'done'
  user: GetCurrentUserOutput | null
  userStatus: 'yet' | 'loading' | 'done'
  users: User[]
  me: User | null
  currentUser: User | null
  currentIsMe: boolean
}
const initialState: State = {
  attr: undefined,
  loading: true,
  attrStatus: 'yet',
  user: null,
  userStatus: 'yet',
  users: [],
  me: null,
  currentUser: null,
  currentIsMe: false,
}

export const fetchAttr = createAsyncThunk(
  'amplifyApi/fetchUserAttributes',
  fetchUserAttributes,
)

export const fetchCurrentUser = createAsyncThunk(
  'amplifyApi/getCurrentUser',
  getCurrentUser,
)

const userAttributesSlice = createSlice({
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

      state.loading = false

      // create user record.
      if (state.user && !state.me) {
        // eslint-disable-next-line no-console
        console.log('create user', state.user.username)
        client.models.User.create({
          userName: state.user.username,
          setting: JSON.stringify({
            darkMode: false,
          }),
        })
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttr.pending, (state) => {
        state.attrStatus = 'loading'
      })
      .addCase(
        fetchAttr.fulfilled,
        (state, action: PayloadAction<FetchUserAttributesOutput>) => {
          state.attr = action.payload
          state.attrStatus = 'done'
        },
      )
      .addCase(fetchAttr.rejected, (state) => {
        state.attrStatus = 'done'
      })
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

export const { finishFetch } = userAttributesSlice.actions
export default userAttributesSlice.reducer
