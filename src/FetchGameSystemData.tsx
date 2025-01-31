import { type ReactNode, useMemo } from 'react'
import { theme } from 'antd'
import { Helmet } from 'react-helmet-async'
import useSubscribeCharacterGroup from '@/hooks/gameData/useSubscribeCharacterGroup.ts'
import useSubscribeNechronicaCharacters from '@/hooks/gameData/useSubscribeNechronicaCharacters.ts'
import useSubscribePartialCharacterGroup from '@/hooks/gameData/useSubscribePartialCharacterGroup.ts'
import useSubscribePartialNechronicaCharacter from '@/hooks/gameData/useSubscribePartialNechronicaCharacter.ts'

interface Props {
  children: ReactNode
}
export default function FetchGameSystemData({ children }: Props) {
  const { token } = theme.useToken()

  // common
  useSubscribeCharacterGroup(...useSubscribePartialCharacterGroup())

  // Nechronica
  useSubscribeNechronicaCharacters(...useSubscribePartialNechronicaCharacter())

  return useMemo(
    () => (
      <>
        <Helmet>
          <style>{`body { background-color: ${token.colorBgLayout}; }`}</style>
        </Helmet>
        {children}
      </>
    ),
    [children, token.colorBgLayout],
  )
}
