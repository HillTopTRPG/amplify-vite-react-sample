import { isEmpty } from 'lodash-es'

export function emptiableFormat<T>(data: T, format: (v: T) => React.ReactNode) {
  return isEmpty(data) ? null : format(data)
}
