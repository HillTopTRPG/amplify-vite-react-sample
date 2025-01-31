import type { PayloadAction } from '@reduxjs/toolkit'

export function simpleReducer<State, Property extends keyof State>(
  property: Property,
) {
  return (state: State, action: PayloadAction<State[Property]>): void => {
    state[property] = action.payload
  }
}
