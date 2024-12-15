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

  type Todo2 = Schema['Todo2']['type']
  const [todo2s, setTodos2] = useState<Todo2[]>([])
  useEffect(() => {
    const sub = client.models.Todo2.observeQuery().subscribe({
      next: ({ items }) => {
        setTodos2([...items])
        setLoading(false)
      },
    })
    return () => sub.unsubscribe()
  }, [])
  const createTodo2 = (todo: Schema['Todo2']['createType']) => {
    client.models.Todo2.create(todo)
  }
  const updateTodo2 = (todo: Schema['Todo2']['updateType']) => {
    client.models.Todo2.update(todo)
  }
  const deleteTodo2 = (id: string) => {
    client.models.Todo2.delete({ id })
  }

  const [characters, setCharacter] = useState<NechronicaCharacter[]>([])
  useEffect(() => {
    const sub = client.models.NechronicaCharacter.observeQuery().subscribe({
      next: ({ items }) => {
        setCharacter([
          ...items.map((item) => ({
            id: item.id,
            name: item.name,
            type: item.type || 'doll',
            sheetId: item.sheetId,
            sheetData: JSON.parse(item.sheetData) as Nechronica,
          })),
        ])
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
    todo2Crud: {
      todo2s,
      createTodo2,
      updateTodo2,
      deleteTodo2,
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

export const [
  NechronicaProvider,
  useNechronicaContext,
  useTodoCrud,
  useTodo2Crud,
] = constate(
  useNechronica,
  (v) => omit(v, 'todoCrud', 'todo2Crud'),
  (v) => v.todoCrud,
  (v) => v.todo2Crud,
)
