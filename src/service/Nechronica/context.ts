import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/api'
import constate from 'constate'
import { omit } from 'lodash-es'
import type { Schema } from '../../../amplify/data/resource.ts'
import {
  type Nechronica,
  type NechronicaAdditionalData,
  type NechronicaCharacter,
} from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

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
            id: item.id,
            name: item.name,
            additionalData: JSON.parse(
              item.additionalData,
            ) as NechronicaAdditionalData,
            sheetData: JSON.parse(item.sheetData) as Nechronica,
          })),
        )
        setLoading(false)
      },
    })
    return () => sub.unsubscribe()
  }, [])
  const createCharacter = (character: Omit<NechronicaCharacter, 'id'>) => {
    // 重複を防ぐ
    if (
      characters.some(
        (c) =>
          c.additionalData.type === character.additionalData.type &&
          c.additionalData.sheetId === character.additionalData.sheetId,
      )
    )
      return
    client.models.NechronicaCharacter.create({
      name: character.sheetData.basic.characterName,
      additionalData: JSON.stringify(character.additionalData),
      sheetData: JSON.stringify(character.sheetData),
    })
  }
  const updateCharacter = (character: NechronicaCharacter) => {
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

  return {
    loading,
    todoCrud: {
      todos,
      createTodo,
      updateTodo,
      deleteTodo,
    },
    dolls: characters.filter((c) => c.additionalData.type === 'doll'),
    savansts: characters.filter((c) => c.additionalData.type === 'savant'),
    horrors: characters.filter((c) => c.additionalData.type === 'horror'),
    legions: characters.filter((c) => c.additionalData.type === 'legion'),
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
