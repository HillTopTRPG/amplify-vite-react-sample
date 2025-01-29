import { useCallback, useState } from 'react'

type PublishObject = {
  readonly id: string
  readonly owner: string
  readonly public: boolean
}

const makeNewPublishObj = (items: PublishObject[]) => {
  const newItems = [...items]
  newItems.sort((a, b) => {
    if (a.id < b.id) return -1
    if (a.id > b.id) return 1
    return 0
  })
  return newItems
}

const notEqualsPublishObjList = (a: PublishObject[], b: PublishObject[]) =>
  a.length !== b.length ||
  a.some(
    (pc, idx) =>
      b[idx].id !== pc.id ||
      b[idx].owner !== pc.owner ||
      b[idx].public !== pc.public,
  )

export function usePublishObject() {
  const [publishCharacters, setPublishCharacters] = useState<PublishObject[]>(
    [],
  )
  const [publishCharacterLoading, setPublishCharacterLoading] =
    useState<boolean>(true)

  const next = useCallback(
    ({ items }: { items: PublishObject[] }) => {
      const newItems = makeNewPublishObj(items)
      if (
        publishCharacterLoading ||
        notEqualsPublishObjList(newItems, publishCharacters)
      ) {
        setPublishCharacters(newItems)
        setPublishCharacterLoading(false)
      }
    },
    [publishCharacterLoading, publishCharacters],
  )

  return [publishCharacters, publishCharacterLoading, next] as const
}
