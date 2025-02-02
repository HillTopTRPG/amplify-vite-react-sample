import { useEffect } from 'react'
import { type Schema } from '@amplify/data/resource.ts'
import { generateClient } from 'aws-amplify/api'
import { type PublishObject } from './common.ts'
import {
  type CharacterGroup,
  type CharacterGroupAdditionalData,
} from '@/service'
import { useAppDispatch, useAppSelector } from '@/store'
import { setCharacterGroups } from '@/store/commonSlice.ts'
import { selectFilter } from '@/store/userAttributesSlice.ts'

const client = generateClient<Schema>()

type RawCharacterGroup = Schema['CharacterGroup']['type']

function convert(raw: RawCharacterGroup): CharacterGroup {
  return {
    ...raw,
    additionalData: JSON.parse(
      raw.additionalData,
    ) as CharacterGroupAdditionalData,
    characterIds: JSON.parse(raw.characterIds) as string[],
  }
}

function sort(a: CharacterGroup, b: CharacterGroup): number {
  if (a.additionalData.stared && !b.additionalData.stared) return -1
  if (b.additionalData.stared && !a.additionalData.stared) return 1
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
}

export default function useSubscribeCharacterGroup(
  publishObjects: PublishObject[],
  publishObjectsLoading: boolean,
) {
  const dispatch = useAppDispatch()
  const filter = useAppSelector(selectFilter)

  useEffect(() => {
    if (publishObjectsLoading) return
    const sub = client.models.CharacterGroup.observeQuery({
      filter,
    }).subscribe({
      next: ({ items }) => {
        const characterGroups = structuredClone(items).map(convert).sort(sort)
        dispatch(setCharacterGroups(characterGroups))
      },
    })
    return () => {
      // eslint-disable-next-line no-console
      console.log('Unsubscribed CharacterGroup observeQuery')
      sub.unsubscribe()
    }
  }, [dispatch, filter, publishObjectsLoading, publishObjects])
}
