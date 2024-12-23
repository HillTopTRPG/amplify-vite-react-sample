import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { theme } from 'antd'
import { generateClient } from 'aws-amplify/api'
import {
  fetchUserAttributes,
  type FetchUserAttributesOutput,
} from 'aws-amplify/auth'
import { getCurrentUser, type GetCurrentUserOutput } from 'aws-amplify/auth'
import constate from 'constate'
import { clone } from 'lodash-es'
import { type Schema } from '../../amplify/data/resource.ts'

const client = generateClient<Schema>()
const { defaultAlgorithm, darkAlgorithm } = theme

export const [UserAttributesProvider, useUserAttributes] = constate(() => {
  const [userAttributeLoading, setUserAttributeLoading] = useState(true)
  const [attr, setAttrResult] = useState<FetchUserAttributesOutput>()
  const reloadUserAttributes = () => {
    fetchUserAttributes()
      .then(setAttrResult)
      .then(() => setUserAttributeLoading(false))
  }
  useEffect(reloadUserAttributes, [])

  const [user, setUser] = useState<GetCurrentUserOutput | null>(null)
  useEffect(() => void getCurrentUser().then(setUser), [])

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
    const me = users.find((u) => u.userName === user?.username) ?? null
    setMe(me)
    const loading = userAttributeLoading || usersLoading || !user || !me
    setLoading(loading)
    if (loading && user && !me) {
      client.models.User.create({
        userName: user.username,
        setting: JSON.stringify({
          darkMode: false,
        }),
      })
    }
  }, [userAttributeLoading, usersLoading, user, users])

  const { userName } = useParams<{ userName: string }>()
  const currentUser = userName ? users.find((u) => u.userName === userName) : me
  const currentIsMe = me?.userName === currentUser?.userName

  const setDarkMode = (getNewValue: (darkMode: boolean) => boolean) => {
    const setting = clone(me?.setting)
    if (!setting) return
    setting.darkMode = getNewValue(setting.darkMode)

    const { id } = users.find((u) => u.userName === user?.username) ?? {}
    if (!id) return

    client.models.User.update({ id, setting: JSON.stringify(setting) })
  }

  const toggleDarkMode = () => setDarkMode((v) => !v)

  const isDarkMode = me?.setting.darkMode ?? false
  const theme = isDarkMode ? ('dark' as const) : ('light' as const)
  const setTheme = (theme: 'dark' | 'light') =>
    setDarkMode(() => theme === 'dark')
  const algorithm = isDarkMode ? darkAlgorithm : defaultAlgorithm

  return {
    attr,
    loading,
    reloadUserAttributes,
    users,
    me,
    currentUser,
    currentIsMe,
    toggleDarkMode,
    isDarkMode,
    theme,
    setTheme,
    algorithm,
  }
})
