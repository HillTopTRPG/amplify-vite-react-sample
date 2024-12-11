import { camelCase } from 'lodash-es'

export function getKeys<T extends Record<string | number | symbol, unknown>>(
  obj: T,
): (keyof T)[] {
  return Object.keys(obj)
}

export function isIncludes<T>(list: T[], key: unknown): key is T {
  return list.includes(key as T)
}

export type ToCamelCase<T extends string> = T extends `${infer R}_${infer U}`
  ? `${R}${Capitalize<ToCamelCase<U>>}`
  : T

type CharacterListObj<T extends string, U> = { [key in `${T}s`]: U[] }
type AddFunctionObj<T extends string, U> = {
  [key in ToCamelCase<`add_${T}`>]: (data: Omit<U, 'type'>) => void
}
type Result<T extends string, U> = CharacterListObj<T, U> & AddFunctionObj<T, U>
export const makeTypeSetFunc = <T extends string, U>(
  makeList: (type: T) => U[],
  makeAddFunc: (type: T) => (data: T) => void,
) => {
  return (type: T): Result<T, U> => {
    return {
      [`${type}s`]: makeList(type),
      [camelCase(`add_${type}`)]: makeAddFunc(type),
    } as Result<T, U>
  }
}
