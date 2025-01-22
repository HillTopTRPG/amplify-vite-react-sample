import { type ReactNode, useEffect, useMemo } from 'react'
import useCharacterGroup from '@/hooks/gameData/useCharacterGroup.ts'
import useCharacterGroupPublish from '@/hooks/gameData/useCharacterGroupPublish.ts'
import useNechronicaCharacter from '@/hooks/gameData/useNechronicaCharacter.ts'
import useNechronicaCharacterPublish from '@/hooks/gameData/useNechronicaCharacterPublish.ts'
import {
  characterGroupsSelector,
  nechronicaCharactersSelector,
  useAppDispatch,
  useSelector,
} from '@/store'
import { setNechronicaCharacterGroupRelations } from '@/store/nechronicaSlice.ts'

interface Props {
  children: ReactNode
}
export default function FetchGameSystemData({ children }: Props) {
  const dispatch = useAppDispatch()

  // common
  useCharacterGroup(...useCharacterGroupPublish())

  // Nechronica
  useNechronicaCharacter(...useNechronicaCharacterPublish())

  const characterGroups = useSelector(characterGroupsSelector)
  const nechronicaCharacters = useSelector(nechronicaCharactersSelector)
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

  return useMemo(() => <>{children}</>, [children])
}
