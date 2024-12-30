import { type ReactNode } from 'react'
import { isEmpty } from 'lodash-es'

export function emptiableFormat<T>(data: T, format: (v: T) => ReactNode) {
  return isEmpty(data) ? null : format(data)
}
