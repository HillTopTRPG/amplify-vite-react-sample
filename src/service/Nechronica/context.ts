import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/api'
import constate from 'constate'
import { omit } from 'lodash-es'
import type { Schema } from '../../../amplify/data/resource.ts'
import { type Nechronica } from '@/service/Nechronica/ts/NechronicaDataHelper.ts'

const client = generateClient<Schema>()

const useNechronica = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [characters, setCharacter] = useState<
    Schema['NechronicaCharacter']['type'][]
  >([])

  const [todos, setTodos] = useState<Schema['Todo']['type'][]>([])
  useEffect(() => {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => {
        setTodos([...items])
        setLoading(false)
      },
    })

    return () => sub.unsubscribe()
  }, [])
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
  const createTodo = (todo: Schema['Todo']['createType']) => {
    client.models.Todo.create(todo)
  }
  const updateTodo = (todo: Schema['Todo']['updateType']) => {
    client.models.Todo.update(todo)
  }
  const deleteTodo = (id: string) => {
    client.models.Todo.delete({ id })
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
    savansts: characters.filter((c) => c.type === 'savant'),
    horrors: characters.filter((c) => c.type === 'horror'),
    legions: characters.filter((c) => c.type === 'legion'),
    createCharacter: (
      sheetId: string,
      type: 'doll' | 'savant' | 'horror' | 'legion',
      data: Nechronica,
    ) => {
      console.log('regist!!!')
      client.models.NechronicaCharacter.create({
        name: data.basic.characterName,
        type,
        sheetId,
        data,
      })
    },
  }
}

export const [NechronicaProvider, useNechronicaContext, useTodoCrud] = constate(
  useNechronica,
  (v) => omit(v, 'todoCrud'),
  (v) => v.todoCrud,
)
