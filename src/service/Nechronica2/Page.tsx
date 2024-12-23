import { NechronicaProvider } from '../Nechronica/context'
import service from './index.ts'
import { TestProvider } from '@/context/test'
import MainContentsLayout from '@/layouts/MainContentsLauout.tsx'
import type services from '@/service'
import { type ValueType } from '@/utils/types.ts'

export default function Page(
  screen: keyof ValueType<typeof services>['screens'],
) {
  return (
    <NechronicaProvider>
      <TestProvider>
        <MainContentsLayout {...service} screen={screen} />
      </TestProvider>
    </NechronicaProvider>
  )
}
