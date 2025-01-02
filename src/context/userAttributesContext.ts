import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { generateClient } from 'aws-amplify/api'
import {
  fetchUserAttributes,
  type FetchUserAttributesOutput,
} from 'aws-amplify/auth'
import { getCurrentUser, type GetCurrentUserOutput } from 'aws-amplify/auth'
import constate from 'constate'
import { type Schema } from '../../amplify/data/resource.ts'
import { useScreenContext } from '@/context/screenContext.ts'

type User = Schema['User']['type'] & {
  setting: {
    darkMode: boolean
  }
}

const client = generateClient<Schema>()

export const [UserAttributesProvider, useUserAttributes] = constate(() => {
  const [attr, setAttrResult] = useState<FetchUserAttributesOutput>()
  const { scope } = useScreenContext()
  const [userAttributeLoading, setUserAttributeLoading] = useState(true)
  const reloadUserAttributes = useCallback(() => {
    fetchUserAttributes()
      .then(setAttrResult)
      .then(() => setTimeout(() => setUserAttributeLoading(false), 10))
      .catch(() => setTimeout(() => setUserAttributeLoading(false), 10))
  }, [])
  useEffect(() => reloadUserAttributes, [reloadUserAttributes])

  const [user, setUser] = useState<GetCurrentUserOutput | null>(null)
  const [userLoading, setUserLoading] = useState(true)
  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .then(() => setTimeout(() => setUserLoading(false), 10))
      .catch(() => setTimeout(() => setUserLoading(false), 10))
  }, [])

  const [users, setUsers] = useState<User[]>([])
  const [usersLoading, setUsersLoading] = useState(true)
  useEffect(() => {
    const sub = client.models.User.observeQuery().subscribe({
      next: ({ items }) => {
        const newUsers = items.map((item) => {
          return { ...item, setting: JSON.parse(item.setting) } as User
        })
        setUsers(newUsers)
        setUsersLoading(false)
      },
    })
    return void sub.unsubscribe
  }, [])

  const [searchParams] = useSearchParams()
  const userName = searchParams.get('userName')

  const [me, setMe] = useState<User | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentIsMe, setCurrentIsMe] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const loading = userAttributeLoading || userLoading || usersLoading
    if (!loading) {
      // console.log('set currentUser', users.length, user?.username, userName)
      const me = users.find((u) => u.userName === user?.username) ?? null
      setMe(me)
      const currentUser = userName
        ? (users.find((u) => u.userName === userName) ?? null)
        : scope === 'private'
          ? me
          : null
      setCurrentUser(currentUser)
      setCurrentIsMe(
        Boolean(currentUser) && currentUser?.userName === user?.username,
      )
    }
    setLoading(loading)
  }, [
    userAttributeLoading,
    userLoading,
    usersLoading,
    users,
    user,
    userName,
    scope,
  ])

  useEffect(() => {
    if (!loading && user && !me) {
      // eslint-disable-next-line no-console
      console.log('create user', user.username)
      client.models.User.create({
        userName: user.username,
        setting: JSON.stringify({
          darkMode: false,
        }),
      })
    }
  }, [loading, me, user])

  return {
    attr,
    loading,
    reloadUserAttributes,
    users,
    me,
    currentUser,
    currentIsMe,
  }
})
