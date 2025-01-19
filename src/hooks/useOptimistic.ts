import { useEffect, useState } from 'react'

export default function useOptimistic<T>(
  value: T,
  onChange?: (value: T) => void,
) {
  const [inputVal, setInputVal] = useState(value)
  useEffect(() => {
    setInputVal(value)
  }, [value])
  const setInputValWrap = (val: T) => {
    setInputVal(val)
    onChange?.call(null, val)
  }

  return [inputVal, setInputValWrap] as const
}
