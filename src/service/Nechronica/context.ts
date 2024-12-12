import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/api'
import constate from 'constate'
import { omit } from 'lodash-es'
import type { Schema } from '../../../amplify/data/resource.ts'
import { makeTypeSetFunc } from '@/utils/types.ts'

const client = generateClient<Schema>()

type CharacterType = 'doll' | 'savant' | 'horror' | 'legion'

type Character = { type: CharacterType }

const useNechronica = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [characters, setCharacter] = useState<Character[]>([])

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
  const createTodo = (todo: Schema['Todo']['createType']) => {
    client.models.Todo.create(todo)
  }
  const updateTodo = (todo: Schema['Todo']['updateType']) => {
    client.models.Todo.update(todo)
  }
  const deleteTodo = (id: string) => {
    client.models.Todo.delete({ id })
  }

  type RawCharacter = Omit<Character, 'type'>

  const makeTypeSet = makeTypeSetFunc<CharacterType, Character>(
    (type) => characters.filter((c) => c.type === type),
    (type) => (data: RawCharacter) =>
      setCharacter((o) => [...o, { ...data, type }]),
  )

  return {
    loading,
    todoCrud: {
      todos,
      createTodo,
      updateTodo,
      deleteTodo,
    },
    ...makeTypeSet('doll'),
    ...makeTypeSet('savant'),
    ...makeTypeSet('horror'),
    ...makeTypeSet('legion'),
  }
}

export const [NechronicaProvider, useNechronicaContext, useTodoCrud] = constate(
  useNechronica,
  (v) => omit(v, 'todoCrud'),
  (v) => v.todoCrud,
)
