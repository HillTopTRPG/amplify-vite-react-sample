import React, {
  forwardRef,
  type ReactNode,
  type Ref,
  useId,
  useMemo,
} from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Flex, Select, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { useMediaQuery } from 'react-responsive'
import SharePageButton from '@/components/SharePageButton.tsx'
import { MEDIA_QUERY } from '@/const/style.ts'
import useScreenNavigateInService from '@/hooks/useScreenNavigateInService.ts'
import AppBreadcrumb from '@/layouts/MainLayout/AppBreadcrumb.tsx'
import { type Screen } from '@/service'
import { useAppSelector } from '@/store'
import { selectMe, selectUsers } from '@/store/userAttributesSlice.ts'

interface Props {
  label: string
  icon: React.FC
  screens: Record<string, Screen>
  topContents?: ReactNode
  children?: ReactNode
}
const ScreenContainer = forwardRef<HTMLElement, Props>(function Component(
  { label, icon, screens, children, topContents }: Props,
  ref: Ref<HTMLElement>,
) {
  const id = useId()
  const isMobile = useMediaQuery(MEDIA_QUERY.MOBILE)
  const { scope, userName, setScreen } = useScreenNavigateInService(screens)
  const me = useAppSelector(selectMe)
  const users = useAppSelector(selectUsers)

  const useUsers = useMemo(() => {
    return users
      ? (me
          ? [me, ...users.filter((u) => u.userName !== me?.userName)]
          : [...users]
        ).map((user) => ({
          ...user,
          viewName:
            user.userName === me?.userName && scope === 'private'
              ? 'あなた'
              : user.userName,
        }))
      : []
  }, [me, scope, users])

  return useMemo(
    () => (
      <Flex
        vertical
        className="screen-container"
        style={{
          padding: '0 12px 24px',
          boxSizing: 'border-box',
          minHeight: '100vh',
          position: 'relative',
        }}
        ref={ref}
      >
        <Helmet>
          <title>{label}</title>
        </Helmet>
        {topContents || <AppBreadcrumb screens={screens} />}
        <Flex align="center" style={{ marginBottom: 12 }}>
          <label htmlFor={id}>
            <Typography.Text style={{ color: 'gray' }}>表示：</Typography.Text>
          </label>
          <Select
            id={id}
            showSearch
            variant="borderless"
            prefix={<UserOutlined />}
            value={userName ?? (scope === 'public' ? '' : (me?.userName ?? ''))}
            style={{ width: 'auto' }}
            options={[
              ...(scope === 'public'
                ? [{ value: '', label: '全ユーザー', icon: <UserOutlined /> }]
                : []),
              ...useUsers.map((user) => ({
                value: user.userName,
                label: user.viewName,
                icon: <UserOutlined />,
              })),
            ]}
            onChange={(key) => {
              setScreen((v) => {
                const newValue = structuredClone(v)
                const idx = newValue.queryParam.findIndex(
                  ([param]) => param === 'userName',
                )
                if (idx >= 0) {
                  if (key) {
                    newValue.queryParam.splice(idx, 1, ['userName', key])
                  } else {
                    newValue.queryParam.splice(idx, 1)
                  }
                } else {
                  if (key) {
                    newValue.queryParam.push(['userName', key])
                  }
                }
                return newValue
              })
            }}
            placement="bottomLeft"
          />
          <SharePageButton screens={screens} />
        </Flex>
        {children}
      </Flex>
    ),
    [
      children,
      icon,
      id,
      isMobile,
      label,
      me?.userName,
      ref,
      scope,
      screens,
      setScreen,
      topContents,
      useUsers,
      userName,
    ],
  )
})

export default ScreenContainer
