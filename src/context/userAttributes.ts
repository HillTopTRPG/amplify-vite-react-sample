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
  const [isLoadedUserAttribute, setIsLoadedUserAttribute] = useState(false)
  const [attr, setAttrResult] = useState<FetchUserAttributesOutput>()
  const reloadUserAttributes = () => {
    fetchUserAttributes()
      .then(setAttrResult)
      .then(() => setIsLoadedUserAttribute(true))
  }
  useEffect(reloadUserAttributes, [])

  const [user, setUser] = useState<GetCurrentUserOutput | null>(null)
  useEffect(() => void getCurrentUser().then(setUser), [])

  const [isLoadedUsers, setIsLoadedUsers] = useState(false)
  type User = Schema['User']['type'] & {
    setting: {
      darkMode: boolean
    }
  }
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    const sub = client.models.User.observeQuery().subscribe({
      next: ({ items }) => {
        setUsers(
          items.map((item) => {
            return { ...item, setting: JSON.parse(item.setting) } as User
          }),
        )
        setIsLoadedUsers(true)
      },
    })
    return () => sub.unsubscribe()
  }, [])

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const nextValue = !isLoadedUserAttribute || !isLoadedUsers || !user
    setLoading(nextValue)
    if (
      !nextValue &&
      user &&
      !users.some((u) => u.userName === user.username)
    ) {
      client.models.User.create({
        userName: user.username,
        setting: JSON.stringify({
          darkMode: false,
        }),
      })
    }
  }, [isLoadedUserAttribute, isLoadedUsers, user, users])

  const { userName } = useParams<{ userName: string }>()
  const me = users.find((u) => u.userName === user?.username)
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
