import { capitalize, pick } from 'lodash-es'

export function getKeys<T extends Record<string | number | symbol, unknown>>(
  obj: T,
): (keyof T)[] {
  return Object.keys(obj)
}

export function isIncludes<T>(list: T[], key: unknown): key is T {
  return list.includes(key as T)
}

type CharacterListObj<T extends string, U> = { [key in `${T}s`]: U[] }
type AddFunctionObj<T extends string, U> = {
  [key in `create${Capitalize<T>}`]: (data: Omit<U, 'type'>) => void
}
type Result<T extends string, U> = CharacterListObj<T, U> & AddFunctionObj<T, U>
export const makeTypeSetFunc = <T extends string, U>(
  makeList: (type: T) => U[],
  makeCreateFunc: (type: T) => (data: T) => void,
) => {
  return (type: T): Result<T, U> => {
    return {
      [`${type}s`]: makeList(type),
      [`create${capitalize(type)}`]: makeCreateFunc(type),
    } as Result<T, U>
  }
}

export type CrudNamesUnion<T extends string> =
  | `${T}s`
  | `create_${Capitalize<T>}`
  | `update_${Capitalize<T>}`
  | `delete_${Capitalize<T>}`

type Head<T> = T extends [infer U, ...unknown[]] ? U : never
type Tail<T extends unknown[]> = T extends [unknown, ...infer Rest] ? Rest : []
export type DeepPath<State, Paths extends unknown[]> =
  Head<Paths> extends keyof State
    ? Tail<Paths> extends []
      ? State[Head<Paths>]
      : DeepPath<NonNullable<State[Head<Paths>]>, Tail<Paths>>
    : never

type Merge3<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
      ? F[K]
      : never
}

type Merge2<A extends object, Bs extends object[]> =
  Head<Bs> extends Bs[0]
    ? Tail<Bs> extends []
      ? Merge3<A, Head<Bs>>
      : Merge2<NonNullable<Merge3<A, Head<Bs>>>, Tail<Bs>>
    : never

export type Merge<Bs extends object[]> =
  Head<Bs> extends Bs[0]
    ? Tail<Bs> extends []
      ? Head<Bs>
      : Merge2<Head<Bs>, Tail<Bs>>
    : never

export type Crud<T extends string, U extends { id: string }> = {
  [key in `${T}s`]: U[]
} & {
  [key in `create${Capitalize<T>}`]: (data: Omit<U, 'id'>) => void
} & {
  [key in `update${Capitalize<T>}`]: (data: U) => void
} & {
  [key in `delete${Capitalize<T>}`]: (id: string) => void
}

export type CrudNames<T extends string> = [
  `${T}s`,
  `create${Capitalize<T>}`,
  `update${Capitalize<T>}`,
  `delete${Capitalize<T>}`,
]
export const makeCrudNames = <T extends string>(modelName: T): CrudNames<T> => {
  return [
    `${modelName}s`,
    `create${capitalize(modelName)}` as `create${Capitalize<T>}`,
    `update${capitalize(modelName)}` as `update${Capitalize<T>}`,
    `delete${capitalize(modelName)}` as `delete${Capitalize<T>}`,
  ] as const satisfies CrudNames<T>
}

export const isProperty = <T extends object>(
  prop: string | number | symbol,
  obj: T,
): prop is keyof T => {
  return prop in obj
}

export const typedPick = <T extends Record<string, unknown>, U extends keyof T>(
  src: T,
  ...properties: U[]
): Pick<T, U> => {
  return pick(src, properties) as Pick<T, U>
}

export type PromiseType<T extends Promise<unknown>> =
  T extends Promise<infer P> ? P : never
