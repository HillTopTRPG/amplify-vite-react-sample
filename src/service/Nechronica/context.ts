import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/api'
import constate from 'constate'
import { omit } from 'lodash-es'
import type { Schema } from '../../../amplify/data/resource.ts'
import { type NechronicaCharacter } from '@/service/Nechronica/index.ts'
import {
  type Nechronica,
  type NechronicaType,
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
            type: item.type || 'doll',
            sheetId: item.sheetId,
            sheetData: JSON.parse(item.sheetData) as Nechronica,
          })),
        )
        setLoading(false)
      },
    })
    return () => sub.unsubscribe()
  }, [])
  const createCharacter = (
    type: 'doll' | 'savant' | 'horror' | 'legion',
    data: Nechronica,
  ) => {
    // 重複を防ぐ
    if (characters.some((d) => d.type === type && d.sheetId === data.sheetId))
      return
    client.models.NechronicaCharacter.create({
      name: data.basic.characterName,
      type,
      sheetId: data.sheetId,
      sheetData: JSON.stringify(data),
    })
  }
  const updateCharacter = (
    id: string,
    type: NechronicaType,
    data: Nechronica,
  ) => {
    client.models.NechronicaCharacter.update({
      id,
      name: data.basic.characterName,
      type,
      sheetId: data.sheetId,
      sheetData: JSON.stringify(data),
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
    dolls: characters.filter((c) => c.type === 'doll'),
    createDoll: (data: Nechronica) => createCharacter('doll', data),
    savansts: characters.filter((c) => c.type === 'savant'),
    createSavant: (data: Nechronica) => createCharacter('savant', data),
    horrors: characters.filter((c) => c.type === 'horror'),
    createHorror: (data: Nechronica) => createCharacter('horror', data),
    legions: characters.filter((c) => c.type === 'legion'),
    createLegion: (data: Nechronica) => createCharacter('legion', data),
    updateCharacter,
    deleteCharacter,
  }
}

export const [NechronicaProvider, useNechronicaContext, useTodoCrud] = constate(
  useNechronica,
  (v) => omit(v, 'todoCrud'),
  (v) => v.todoCrud,
)
