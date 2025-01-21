import { type ReactNode, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Schema } from '@amplify/data/resource.ts'
import { generateClient } from 'aws-amplify/api'
import useScreenLocation from '@/hooks/useScreenLocation.ts'
import { useAppDispatch, useSelector } from '@/store'
import {
  fetchAttr,
  fetchCurrentUser,
  finishFetch,
} from '@/store/userAttributesSlice.ts'

const client = generateClient<Schema>()

type User = Schema['User']['type'] & {
  setting: {
    darkMode: boolean
  }
}

interface Props {
  children: ReactNode
}
export default function FetchUserAttributes({ children }: Props) {
  const { scope } = useScreenLocation()
  const [searchParams] = useSearchParams()
  const userName = searchParams.get('userName')

  const attrStatus = useSelector((state) => state.userAttributes.attrStatus)
  const userStatus = useSelector((state) => state.userAttributes.userStatus)
  const dispatch = useAppDispatch()

  if (attrStatus === 'yet') {
    // eslint-disable-next-line no-console
    console.log('fetchAttr')
    dispatch(fetchAttr())
  }

  useEffect(() => {
    if (attrStatus !== 'done' || userStatus !== 'yet') return
    // eslint-disable-next-line no-console
    console.log('fetchCurrentUser')
    dispatch(fetchCurrentUser())
  }, [attrStatus, dispatch, userStatus])

  useEffect(() => {
    if (attrStatus !== 'done' || userStatus !== 'done') return

    // eslint-disable-next-line no-console
    console.log('get user records.')

    const sub = client.models.User.observeQuery().subscribe({
      next: ({ items }) => {
        const users = items.map((item) => {
          return { ...item, setting: JSON.parse(item.setting) } as User
        })
        dispatch(finishFetch({ scope, userName, users }))
      },
    })
    return void sub.unsubscribe
  }, [attrStatus, dispatch, scope, userName, userStatus])

  return useMemo(() => <>{children}</>, [children])
}
