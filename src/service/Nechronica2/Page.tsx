import service from './index.ts'
import type screens from './screens'
import { NechronicaProvider } from '@/context/nechronica'
import { TestProvider } from '@/context/test'
import MainContentsLayout from '@/layouts/MainContentsLauout.tsx'

export default function Page(screen: keyof typeof screens) {
  return (
    <NechronicaProvider>
      <TestProvider>
        <MainContentsLayout {...service} screen={screen} />
      </TestProvider>
    </NechronicaProvider>
  )
}