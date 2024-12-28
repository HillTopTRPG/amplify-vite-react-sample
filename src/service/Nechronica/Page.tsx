import { NechronicaProvider } from './context'
import service from './index.ts'
import type screens from './screens'
import { ScreenProvider } from '@/context/screen.ts'
import MainContentsLayout from '@/layouts/MainContentsLauout.tsx'

export default function Page(
  screen: keyof typeof screens,
  scope: 'private' | 'public',
) {
  return (
    <NechronicaProvider>
      <ScreenProvider {...service} screen={screen} scope={scope}>
        <MainContentsLayout />
      </ScreenProvider>
    </NechronicaProvider>
  )
}
