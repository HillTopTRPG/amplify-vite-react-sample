import { useState } from 'react'

export function useTest1() {
  const [test1, setTest1] = useState<number>(0)
  const incrementTest1 = () => {
    setTest1(test1 + 1)
  }
  const isTest1Odd = test1 % 2 === 1
  return {
    test1,
    isTest1Odd,
    setTest1,
    incrementTest1,
  }
}
