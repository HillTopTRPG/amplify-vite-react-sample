import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/api'
import constate from 'constate'
import { omit } from 'lodash-es'
import type { Schema } from '../../../amplify/data/resource.ts'
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

  type Todo = Schema['Todo']['type']
  const [todos, setTodos] = useState<Todo[]>([])
  useEffect(() => {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => {
        setTodos([...items])
        setLoading(false)
      },
    })
    return () => sub.unsubscribe()
  }, [])
  const createTodo = (todo: Schema['Todo']['createType']) => {
    client.models.Todo.create(todo)
  }
  const updateTodo = (todo: Schema['Todo']['updateType']) => {
    client.models.Todo.update(todo)
  }
  const deleteTodo = (id: string) => {
    client.models.Todo.delete({ id })
  }

  const [characters, setCharacter] = useState<NechronicaCharacter[]>([])
  useEffect(() => {
    const sub = client.models.NechronicaCharacter.observeQuery().subscribe({
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
    return () => sub.unsubscribe()
  }, [])
  const createCharacter = (
    character: NonNullable<
      PromiseType<ReturnType<typeof NechronicaDataHelper.fetch>>
    >,
  ) => {
    // 重複チェック
    const compare = (c: NechronicaCharacter) =>
      (['type', 'sheetId', 'owner'] as const).every(
        (p) => c.additionalData[p] === character.additionalData[p],
      )
    if (characters.some(compare)) return

    client.models.NechronicaCharacter.create({
      name: character.sheetData.basic.characterName,
      additionalData: JSON.stringify({
        ...character.additionalData,
        stared: false,
      }),
      sheetData: JSON.stringify(character.sheetData),
    })
  }
  const updateCharacter = (character: NechronicaCharacter) => {
    // createdAt, updatedAt は更新しない
    client.models.NechronicaCharacter.update({
      id: character.id,
      name: character.sheetData.basic.characterName,
      additionalData: JSON.stringify(character.additionalData),
      sheetData: JSON.stringify(character.sheetData),
    })
  }
  const deleteCharacter = (id: string) => {
    client.models.NechronicaCharacter.delete({ id })
  }

  const makeTypedObj = <Type extends NechronicaType>(
    type: Type,
  ): { [key in `${Type}s`]: NechronicaCharacter[] } => {
    return {
      [`${type}s`]: characters
        .filter((c) => c.additionalData.type === type)
        .slice()
        .sort((a: NechronicaCharacter, b: NechronicaCharacter) => {
          if (a.additionalData.stared && !b.additionalData.stared) return -1
          return b.updatedAt.getTime() - a.updatedAt.getTime()
        }),
    } as { [key in `${Type}s`]: NechronicaCharacter[] }
  }

  return {
    loading,
    todoCrud: {
      todos,
      createTodo,
      updateTodo,
      deleteTodo,
    },
    ...makeTypedObj('doll'),
    ...makeTypedObj('savant'),
    ...makeTypedObj('horror'),
    ...makeTypedObj('legion'),
    createCharacter,
    updateCharacter,
    deleteCharacter,
  }
}

export const [NechronicaProvider, useNechronicaContext, useTodoCrud] = constate(
  useNechronica,
  (v) => omit(v, 'todoCrud'),
  (v) => v.todoCrud,
)
