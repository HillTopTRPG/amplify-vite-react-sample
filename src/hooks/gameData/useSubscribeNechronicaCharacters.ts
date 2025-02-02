import { useEffect } from 'react'
import { type Schema } from '@amplify/data/resource.ts'
import type {
  Nechronica,
  NechronicaAdditionalData,
  NechronicaCharacter,
} from '@higanbina/ts/NechronicaDataHelper.ts'
import { generateClient } from 'aws-amplify/api'
import { type PublishObject } from './common.ts'
import { nechronicaTypes } from '@/service/higanbina'
import { useAppDispatch, useAppSelector } from '@/store'
import { setNechronicaCharacters } from '@/store/nechronicaSlice.ts'
import { selectFilter } from '@/store/userAttributesSlice.ts'

const client = generateClient<Schema>()

type RawNechronicaCharacter = Schema['NechronicaCharacter']['type']

function convert(raw: RawNechronicaCharacter): NechronicaCharacter {
  return {
    ...raw,
    additionalData: JSON.parse(raw.additionalData) as NechronicaAdditionalData,
    sheetData: JSON.parse(raw.sheetData) as Nechronica,
  }
}

function sort(a: NechronicaCharacter, b: NechronicaCharacter): number {
  const typeDiff =
    nechronicaTypes.findIndex((t) => t === a.additionalData.type) -
    nechronicaTypes.findIndex((t) => t === b.additionalData.type)
  if (typeDiff) return typeDiff
  if (a.additionalData.stared && !b.additionalData.stared) return -1
  if (b.additionalData.stared && !a.additionalData.stared) return 1
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
}

export default function useSubscribeNechronicaCharacters(
  publishObjects: PublishObject[],
  publishObjectsLoading: boolean,
) {
  const dispatch = useAppDispatch()
  const filter = useAppSelector(selectFilter)

  useEffect(() => {
    if (publishObjectsLoading) return
    const sub = client.models.NechronicaCharacter.observeQuery({
      filter,
    }).subscribe({
      next: ({ items }) => {
        const nechronicaCharacters = structuredClone(items)
          .map(convert)
          .sort(sort)
        dispatch(setNechronicaCharacters(nechronicaCharacters))
      },
    })
    return () => {
      // eslint-disable-next-line no-console
      console.log('Unsubscribed NechronicaCharacter observeQuery')
      sub.unsubscribe()
    }
  }, [dispatch, filter, publishObjectsLoading, publishObjects])
}
