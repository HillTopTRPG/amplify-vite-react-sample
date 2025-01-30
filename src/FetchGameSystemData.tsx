import { type ReactNode, useEffect, useMemo } from 'react'
import { theme } from 'antd'
import { Helmet } from 'react-helmet-async'
import useCharacterGroup from '@/hooks/gameData/useCharacterGroup.ts'
import useCharacterGroupPublish from '@/hooks/gameData/useCharacterGroupPublish.ts'
import useNechronicaCharacter from '@/hooks/gameData/useNechronicaCharacter.ts'
import useNechronicaCharacterPublish from '@/hooks/gameData/useNechronicaCharacterPublish.ts'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectCharacterGroups } from '@/store/commonSlice.ts'
import {
  selectNechronicaCharacters,
  setNechronicaCharacterGroupRelations,
} from '@/store/nechronicaSlice.ts'

interface Props {
  children: ReactNode
}
export default function FetchGameSystemData({ children }: Props) {
  const dispatch = useAppDispatch()

  // common
  useCharacterGroup(...useCharacterGroupPublish())

  // Nechronica
  useNechronicaCharacter(...useNechronicaCharacterPublish())

  const characterGroups = useAppSelector(selectCharacterGroups)
  const nechronicaCharacters = useAppSelector(selectNechronicaCharacters)
  useEffect(() => {
    dispatch(
      setNechronicaCharacterGroupRelations(
        characterGroups.map((cg) => ({
          ...cg,
          characters: nechronicaCharacters.filter((c) =>
            cg.characterIds.includes(c.id),
          ),
        })),
      ),
    )
  }, [characterGroups, dispatch, nechronicaCharacters])
  const { token } = theme.useToken()

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
