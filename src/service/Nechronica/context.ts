import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/api'
import constate from 'constate'
import { omit } from 'lodash-es'
import type { Schema } from '../../../amplify/data/resource.ts'
import { type Nechronica } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

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

  type NechronicaCharacter = Schema['NechronicaCharacter']['type']
  const [characters, setCharacter] = useState<NechronicaCharacter[]>([])
  useEffect(() => {
    const sub = client.models.NechronicaCharacter.observeQuery().subscribe({
      next: ({ items }) => {
        console.log('$$$$$$$$$')
        setCharacter([...items])
        setLoading(false)
      },
    })
    return () => sub.unsubscribe()
  }, [])
  const createCharacter = (
    sheetId: string,
    type: 'doll' | 'savant' | 'horror' | 'legion',
    data: Nechronica,
  ) => {
    console.log('regist!!!')
    client.models.NechronicaCharacter.create({
      name: data.basic.characterName,
      type,
      sheetId,
      sheetData: JSON.stringify(data),
    })
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
    savansts: characters.filter((c) => c.type === 'savant'),
    horrors: characters.filter((c) => c.type === 'horror'),
    legions: characters.filter((c) => c.type === 'legion'),
    createCharacter,
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
