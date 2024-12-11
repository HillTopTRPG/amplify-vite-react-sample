import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/api'
import constate from 'constate'
import type { Schema } from '../../amplify/data/resource.ts'
import { makeTypeSetFunc } from '@/utils/types.ts'

const client = generateClient<Schema>()

type CharacterType = 'doll' | 'savant' | 'horror' | 'legion'

type Character = { type: CharacterType }

const useNechronica = () => {
  const [todos, setTodos] = useState<Schema['Todo']['type'][]>([])
  const [characters, setCharacter] = useState<Character[]>([])

  type RawCharacter = Omit<Character, 'type'>

  const makeTypeSet = makeTypeSetFunc<CharacterType, Character>(
    (type) => characters.filter((c) => c.type === type),
    (type) => (data: RawCharacter) =>
      setCharacter((o) => [...o, { ...data, type }]),
  )

  useEffect(() => {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => setTodos([...items]),
    })
    return () => sub.unsubscribe()
  }, [setTodos])

  const createTodo = () => {
    const content = window.prompt('content')
    if (!content) return
    client.models.Todo.create({ content })
  }

  const deleteTodo = (id: string) => {
    client.models.Todo.delete({ id })
  }

  return {
    todos,
    createTodo,
    deleteTodo,
    ...makeTypeSet('doll'),
    ...makeTypeSet('savant'),
    ...makeTypeSet('horror'),
    ...makeTypeSet('legion'),
  }
}

export const [NechronicaProvider, useNechronicaContext] =
  constate(useNechronica)
