import { useMemo } from 'react'
import { type CharacterGroupRelation } from '@higanbina/ts/NechronicaDataHelper.ts'
import { useAppSelector } from '@/store'
import { selectCharacterGroups } from '@/store/commonSlice.ts'
import { selectNechronicaCharacters } from '@/store/nechronicaSlice.ts'

export default function useNechronicaGroupRelations(): CharacterGroupRelation[] {
  const characterGroups = useAppSelector(selectCharacterGroups)
  const nechronicaCharacters = useAppSelector(selectNechronicaCharacters)

  return useMemo(
    () =>
      characterGroups.map((cg) => ({
        ...cg,
        characters: nechronicaCharacters.filter((c) =>
          cg.characterIds.includes(c.id),
        ),
      })),
    [characterGroups, nechronicaCharacters],
  )
}
