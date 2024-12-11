import { useMemo, useState } from 'react'

export function useTest2(test1: number, isTest1Odd: boolean) {
  const [test2Obj, setTest2Obj] = useState<{ test2: number }>({ test2: 0 })
  const incrementTest2 = () => {
    setTest2Obj({ test2: test2Obj.test2 + 1 })
  }
  const outputText = useMemo(() => {
    if (isTest1Odd) {
      return 'Test1 is odd'
    }
    return 'Test1 is even'
  }, [isTest1Odd])

  const test3 = test1 + test2Obj.test2

  return {
    test2Obj,
    setTest2Obj,
    incrementTest2,
    outputText,
    test3,
  }
}
