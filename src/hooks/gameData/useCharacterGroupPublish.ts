import { useEffect, useState } from 'react'
import { type Schema } from '@amplify/data/resource.ts'
import { generateClient } from 'aws-amplify/api'
import { sortPublishObjects, type PublishObject } from './common.ts'
import { userAttributesLoadingSelector, useSelector } from '@/store'

const client = generateClient<Schema>()

export default function useCharacterGroupPublish() {
  const userAttributesLoading = useSelector(userAttributesLoadingSelector)

  const [objects, setObjects] = useState<PublishObject[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (userAttributesLoading) return
    const sub = client.models.CharacterGroup.observeQuery({
      selectionSet: ['id', 'owner', 'public'],
    }).subscribe({
      next: ({ items }: { items: PublishObject[] }) => {
        setObjects(sortPublishObjects(items))
        setLoading(false)
      },
    })
    return () => {
      // eslint-disable-next-line no-console
      console.log('Unsubscribed CharacterGroup(Picked) observeQuery')
      sub.unsubscribe()
    }
  }, [userAttributesLoading])

  return [objects, loading] as const
}
