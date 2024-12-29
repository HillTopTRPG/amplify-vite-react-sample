import { useEffect, useMemo, useState } from 'react'
import { generateClient } from 'aws-amplify/api'
import constate from 'constate'
import type { Schema } from '../../../amplify/data/resource.ts'
import { useScreenContext } from '@/context/screenContext.ts'
import { useUserAttributes } from '@/context/userAttributesContext.ts'
import {
  type CharacterGroup,
  type CharacterGroupAdditionalData,
} from '@/service'
import {
  type Nechronica,
  type NechronicaAdditionalData,
  type NechronicaCharacter,
  type NechronicaDataHelper,
  type NechronicaType,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import { type PromiseType, typedOmit, typedPick } from '@/utils/types.ts'

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

const client = generateClient<Schema>()

const useNechronica = () => {
  const { loading: loadingUserAttributes, me } = useUserAttributes()
  const { scope } = useScreenContext()

  const AmplifyDataFilter = useMemo(() => {
    console.log(scope)
    if (me?.userName) {
      return {
        or: [
          {
            owner: {
              eq: scope === 'private' ? (me?.userName ?? '') : '',
            },
          },
          {
            public: {
              eq: true,
            },
          },
        ],
      }
    }
    return {
      public: {
        eq: true,
      },
    }
  }, [me?.userName, scope])

  const [publishCharacters, setPublishCharacters] = useState<PublishObject[]>(
    [],
  )
  const [publishCharacterLoading, setPublishCharacterLoading] =
    useState<boolean>(true)
  useEffect(() => {
    if (loadingUserAttributes) return () => {}
    const sub = client.models.NechronicaCharacter.observeQuery({
      selectionSet: ['id', 'owner', 'public'],
    }).subscribe({
      next: ({ items }: { items: PublishObject[] }) => {
        const newItems = makeNewPublishObj(items)
        if (
          publishCharacterLoading ||
          notEqualsPublishObjList(newItems, publishCharacters)
        ) {
          setPublishCharacters(newItems)
          setPublishCharacterLoading(false)
        }
      },
    })
    return () => {
      console.log('unsub1')
      sub.unsubscribe()
    }
  }, [loadingUserAttributes, publishCharacterLoading, publishCharacters])

  const [characters, setCharacters] = useState<NechronicaCharacter[]>([])
  const [characterLoading, setCharacterLoading] = useState<boolean>(true)
  useEffect(() => {
    if (loadingUserAttributes || publishCharacterLoading) return () => {}
    const sub = client.models.NechronicaCharacter.observeQuery({
      filter: AmplifyDataFilter,
    }).subscribe({
      // const sub = client.models.NechronicaCharacter.observeQuery().subscribe({
      next: ({ items }) => {
        const types: NechronicaType[] = ['doll', 'savant', 'horror', 'legion']
        setCharacters(
          items
            .map((item) => ({
              ...item,
              additionalData: JSON.parse(
                item.additionalData,
              ) as NechronicaAdditionalData,
              sheetData: JSON.parse(item.sheetData) as Nechronica,
              createdAt: new Date(item.createdAt),
              updatedAt: new Date(item.updatedAt),
            }))
            .sort((a, b) => {
              const typeDiff =
                types.findIndex((t) => t === a.additionalData.type) -
                types.findIndex((t) => t === b.additionalData.type)
              if (typeDiff) return typeDiff
              if (a.additionalData.stared && !b.additionalData.stared) return -1
              if (b.additionalData.stared && !a.additionalData.stared) return 1
              return b.updatedAt.getTime() - a.updatedAt.getTime()
            }),
        )
        setCharacterLoading(false)
      },
    })
    return () => {
      console.log('unsub2')
      sub.unsubscribe()
    }
  }, [
    AmplifyDataFilter,
    loadingUserAttributes,
    publishCharacterLoading,
    publishCharacters,
  ])

  const createCharacter = (
    character: NonNullable<
      PromiseType<ReturnType<typeof NechronicaDataHelper.fetch>>
    >,
  ) => {
    // 重複チェック
    const compare = (c: NechronicaCharacter) =>
      (['type', 'sheetId'] as const).every(
        (p) => c.additionalData[p] === character.additionalData[p],
      ) && c.owner === me?.userName
    if (characters.some(compare)) return

    const additionalData: NechronicaAdditionalData = {
      ...character.additionalData,
      stared: false,
    }

    client.models.NechronicaCharacter.create({
      name: character.sheetData.basic.characterName,
      additionalData: JSON.stringify(additionalData),
      sheetData: JSON.stringify(character.sheetData),
      owner: me?.userName || '',
      public: false,
    })
  }
  const updateCharacter = (character: NechronicaCharacter) => {
    const old = characters.find((c) => c.id === character.id)
    if (!old) return
    if (old.owner !== character.owner) return

    // createdAt, updatedAt は更新しない
    client.models.NechronicaCharacter.update({
      ...typedOmit(character, 'createdAt', 'updatedAt'),
      name: character.sheetData.basic.characterName,
      additionalData: JSON.stringify(character.additionalData),
      sheetData: JSON.stringify(character.sheetData),
    })
  }
  const deleteCharacter = (id: string) => {
    client.models.NechronicaCharacter.delete({ id })
  }

  const [publishCharacterGroups, setPublishCharacterGroups] = useState<
    PublishObject[]
  >([])
  const [publishCharacterGroupLoading, setPublishCharacterGroupLoading] =
    useState<boolean>(true)
  useEffect(() => {
    if (loadingUserAttributes) return () => {}
    const sub = client.models.CharacterGroup.observeQuery({
      selectionSet: ['id', 'owner', 'public'],
    }).subscribe({
      next: ({ items }: { items: PublishObject[] }) => {
        const newItems = makeNewPublishObj(items)
        if (
          publishCharacterGroupLoading ||
          notEqualsPublishObjList(newItems, publishCharacterGroups)
        ) {
          setPublishCharacterGroups(newItems)
          setPublishCharacterGroupLoading(false)
        }
      },
    })
    return () => {
      console.log('unsub3')
      sub.unsubscribe()
    }
  }, [
    loadingUserAttributes,
    publishCharacterGroupLoading,
    publishCharacterGroups,
  ])

  const [characterGroups, setCharacterGroups] = useState<CharacterGroup[]>([])
  const [characterGroupLoading, setCharacterGroupLoading] =
    useState<boolean>(true)
  useEffect(() => {
    if (loadingUserAttributes || publishCharacterGroupLoading) return () => {}
    const sub = client.models.CharacterGroup.observeQuery({
      filter: AmplifyDataFilter,
    }).subscribe({
      next: ({ items }) => {
        setCharacterGroups(
          items.map((item) => ({
            ...item,
            additionalData: JSON.parse(
              item.additionalData,
            ) as CharacterGroupAdditionalData,
            characterIds: JSON.parse(item.characterIds) as string[],
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
          })),
        )
        setCharacterGroupLoading(false)
      },
    })
    return () => {
      console.log('unsub4')
      sub.unsubscribe()
    }
  }, [
    AmplifyDataFilter,
    loadingUserAttributes,
    publishCharacterGroupLoading,
    publishCharacterGroups,
  ])

  const createCharacterGroup = (
    group: Pick<CharacterGroup, 'name' | 'characterIds'>,
  ) => {
    // 重複チェック
    const compare = (cg: CharacterGroup) =>
      (['name'] as const).every((p) => cg[p] === group[p]) &&
      cg.system === 'nechronica' &&
      cg.owner === me?.userName
    if (characterGroups.some(compare)) return

    client.models.CharacterGroup.create({
      system: 'nechronica',
      ...typedPick(group, 'name'),
      additionalData: JSON.stringify({ stared: false }),
      characterIds: JSON.stringify(group.characterIds),
      owner: me?.userName || '',
      public: false,
    })
  }
  const updateCharacterGroup = (group: CharacterGroup) => {
    const old = characterGroups.find((cg) => cg.id === group.id)
    if (!old) return
    if (old.owner !== group.owner) return

    // createdAt, updatedAt は更新しない
    client.models.CharacterGroup.update({
      ...typedOmit(group, 'createdAt', 'updatedAt'),
      additionalData: JSON.stringify(group.additionalData),
      characterIds: JSON.stringify(group.characterIds),
    })
  }
  const deleteCharacterGroup = (id: string) => {
    client.models.CharacterGroup.delete({ id })
  }
  const characterGroupRelations = characterGroups.map((cg) => ({
    ...cg,
    characters: characters.filter((c) => cg.characterIds.includes(c.id)),
  }))

  return {
    loading: characterLoading || characterGroupLoading,
    characters,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    characterGroups,
    characterGroupRelations,
    createCharacterGroup,
    updateCharacterGroup,
    deleteCharacterGroup,
  }
}

export const [NechronicaProvider, useNechronicaContext] =
  constate(useNechronica)
