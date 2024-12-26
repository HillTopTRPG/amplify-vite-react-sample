import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { generateClient } from 'aws-amplify/api'
import {
  fetchUserAttributes,
  type FetchUserAttributesOutput,
} from 'aws-amplify/auth'
import { getCurrentUser, type GetCurrentUserOutput } from 'aws-amplify/auth'
import constate from 'constate'
import { type Schema } from '../../amplify/data/resource.ts'

const client = generateClient<Schema>()

export const [UserAttributesProvider, useUserAttributes] = constate(() => {
  const [attr, setAttrResult] = useState<FetchUserAttributesOutput>()
  const [userAttributeLoading, setUserAttributeLoading] = useState(true)
  const reloadUserAttributes = () => {
    fetchUserAttributes()
      .then(setAttrResult)
      .then(() => setUserAttributeLoading(false))
      .catch(() => setUserAttributeLoading(false))
  }
  useEffect(reloadUserAttributes, [])

  const [user, setUser] = useState<GetCurrentUserOutput | null>(null)
  const [userLoading, setUserLoading] = useState(true)
  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .then(() => setUserLoading(false))
      .catch(() => setUserLoading(false))
  }, [])

  type User = Schema['User']['type'] & {
    setting: {
      darkMode: boolean
    }
  }

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

  const [me, setMe] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setMe(users.find((u) => u.userName === user?.username) ?? null)
    setLoading(userAttributeLoading || userLoading || usersLoading)
  }, [users, user?.username, userAttributeLoading, userLoading, usersLoading])

  useEffect(() => {
    if (!loading && user && !me) {
      console.log('create user')
      client.models.User.create({
        userName: user.username,
        setting: JSON.stringify({
          darkMode: false,
        }),
      })
    }
  }, [loading, me, user])

  const { userName } = useParams<{ userName: string }>()
  const currentUser = userName ? users.find((u) => u.userName === userName) : me
  const currentIsMe = me && me?.userName === currentUser?.userName

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
