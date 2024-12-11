import constate from 'constate'
import { useTest1 } from './useTest1.ts'
import { useTest2 } from './useTest2.ts'

const useTest = () => {
  const test1Context = useTest1()
  const test2Context = useTest2(test1Context.test1, test1Context.isTest1Odd)

  return { ...test1Context, ...test2Context }
}

export const [TestProvider, useTestContext] = constate(useTest)
