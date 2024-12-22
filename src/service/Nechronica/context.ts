import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/api'
import constate from 'constate'
import type { Schema } from '../../../amplify/data/resource.ts'
import { useUserAttributes } from '@/context/userAttributes.ts'
import {
  type Nechronica,
  type NechronicaAdditionalData,
  type NechronicaCharacter,
  type NechronicaDataHelper,
  type NechronicaType,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'
import { type PromiseType } from '@/utils/types.ts'

const client = generateClient<Schema>()

const useNechronica = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const { loading: loadingUserAttributes, me } = useUserAttributes()

  const [characters, setCharacter] = useState<NechronicaCharacter[]>([])
  useEffect(() => {
    if (loadingUserAttributes) return () => {}
    const sub = client.models.NechronicaCharacter.observeQuery({
      filter: {
        or: [
          {
            owner: {
              eq: me?.userName ?? '',
            },
          },
          {
            public: {
              eq: true,
            },
          },
        ],
      },
    }).subscribe({
      next: ({ items }) => {
        setCharacter(
          items.map((item) => ({
            ...item,
            additionalData: JSON.parse(
              item.additionalData,
            ) as NechronicaAdditionalData,
            sheetData: JSON.parse(item.sheetData) as Nechronica,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
          })),
        )
        setLoading(false)
      },
    })
    return void sub.unsubscribe
  }, [loadingUserAttributes, me?.userName])
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
    const oldCharacter = characters.find((c) => c.id === character.id)
    if (!oldCharacter) return
    if (oldCharacter.owner !== character.owner) return

    // createdAt, updatedAt は更新しない
    client.models.NechronicaCharacter.update({
      ...character,
      name: character.sheetData.basic.characterName,
      additionalData: JSON.stringify(character.additionalData),
      sheetData: JSON.stringify(character.sheetData),
    })
  }
  const deleteCharacter = (id: string) => {
    client.models.NechronicaCharacter.delete({ id })
  }

  type TypedObj<Type extends NechronicaType> = {
    [key in `${Type}s`]: NechronicaCharacter[]
  } & {
    [key in `${Type}sFilterByOwner`]: (
      owner: string,
      isMe: boolean,
    ) => NechronicaCharacter[]
  }
  const makeTypedObj = <Type extends NechronicaType>(type: Type) => {
    const typedList = characters
      .filter((c) => {
        if (c.additionalData.type !== type) return false
        //
        return true
      })
      .slice()
      .sort((a: NechronicaCharacter, b: NechronicaCharacter) => {
        if (a.additionalData.stared && !b.additionalData.stared) return -1
        if (b.additionalData.stared && !a.additionalData.stared) return 1
        return b.updatedAt.getTime() - a.updatedAt.getTime()
      })
    return {
      [`${type}s`]: typedList,
      [`${type}sFilterByOwner`]: (owner: string, isMe: boolean) =>
        typedList.filter((c) => {
          if (c.owner !== owner) return false
          if (!c.public && !isMe) return false
          //
          return true
        }),
    } as TypedObj<Type>
  }

  return {
    loading,
    ...makeTypedObj('doll'),
    ...makeTypedObj('savant'),
    ...makeTypedObj('horror'),
    ...makeTypedObj('legion'),
    createCharacter,
    updateCharacter,
    deleteCharacter,
  }
}

export const [NechronicaProvider, useNechronicaContext] =
  constate(useNechronica)
