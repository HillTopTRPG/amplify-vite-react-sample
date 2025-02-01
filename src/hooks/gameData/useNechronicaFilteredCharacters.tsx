import { useEffect, useState } from 'react'
import { screens } from '@higanbina/screens.ts'
import { type NechronicaCharacter } from '@higanbina/ts/NechronicaDataHelper.ts'
import useNechronicaLoading from '@/hooks/gameData/useNechronicaLoading.ts'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'
import { useAppSelector } from '@/store'
import { selectNechronicaCharacters } from '@/store/nechronicaSlice.ts'
import { selectCurrentUser } from '@/store/userAttributesSlice.ts'

export default function useNechronicaFilteredCharacters() {
  const loading = useNechronicaLoading()
  const characters = useAppSelector(selectNechronicaCharacters)
  const currentUser = useAppSelector(selectCurrentUser)
  const { scope } = useScreenNavigateInService(screens)

  const [useCharacters, setUseCharacters] = useState<NechronicaCharacter[]>([])
  const [useLoading, setUseLoading] = useState(true)

  useEffect(() => {
    if (loading) return
    setUseCharacters(
      characters.filter((c) => {
        if (scope === 'public' && !currentUser) return true
        return c.owner === currentUser?.userName
      }),
    )
    setUseLoading(false)
  }, [characters, currentUser, loading, scope])

  return [loading || useLoading, useCharacters] as const
}
