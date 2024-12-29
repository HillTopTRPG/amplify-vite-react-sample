import { NechronicaProvider } from './context'
import service from './index.ts'
import type screens from './screens'
import { ScreenProvider } from '@/context/screen.ts'
import MainContentsLayout from '@/layouts/MainContentsLauout.tsx'

export type Scope = 'private' | 'public'

export default function Page(screen: keyof typeof screens, scope: Scope) {
  return (
    <ScreenProvider {...service} screen={screen} scope={scope}>
      <NechronicaProvider>
        <MainContentsLayout />
      </NechronicaProvider>
    </ScreenProvider>
  )
}
