import { type ReactNode, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Schema } from '@amplify/data/resource.ts'
import { generateClient } from 'aws-amplify/api'
import useScreenLocation from '@/hooks/useScreenLocation.ts'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  fetchCurrentUser,
  finishFetch,
  type User,
} from '@/store/userAttributesSlice.ts'

const client = generateClient<Schema>()

function parseUserSetting(item: { userName: string; setting: string }) {
  const setting = JSON.parse(item.setting)
  if (
    !('avatarProps' in setting) ||
    !setting.avatarProps ||
    typeof setting.avatarProps !== 'object'
  ) {
    setting.avatarProps = {}
  }
  const checkAndSetValue = (property: string, value: string) => {
    if (
      !(property in setting.avatarProps) ||
      typeof setting.avatarProps[property] !== 'string'
    ) {
      setting.avatarProps[property] = value
    }
  }
  checkAndSetValue('name', item.userName)
  checkAndSetValue('variant', 'beam')
  if (
    !('colors' in setting.avatarProps) ||
    !Array.isArray(setting.avatarProps.colors)
  ) {
    setting.avatarProps.colors = [
      '#264653',
      '#2a9d8f',
      '#e9c46a',
      '#f4a261',
      '#e76f51',
    ]
  }
  return setting as User['setting']
}

interface Props {
  children: ReactNode
}
export default function FetchUserAttributes({ children }: Props) {
  const dispatch = useAppDispatch()
  const { scope } = useScreenLocation()
  const [searchParams] = useSearchParams()
  const userName = searchParams.get('userName')

  const userStatus = useAppSelector((state) => state.userAttributes.userStatus)

  if (userStatus === 'yet') {
    // eslint-disable-next-line no-console
    console.log('fetchCurrentUser')
    dispatch(fetchCurrentUser())
  }

  useEffect(() => {
    if (userStatus !== 'done') return

    // eslint-disable-next-line no-console
    console.log('get user records.')

    const sub = client.models.User.observeQuery().subscribe({
      next: ({ items }) => {
        const users = items.map((item) => {
          const setting = parseUserSetting(item)
          return { ...item, setting } as User
        })
        dispatch(finishFetch({ scope, userName, users }))
      },
    })
    return void sub.unsubscribe
  }, [dispatch, scope, userName, userStatus])

  return children
}
