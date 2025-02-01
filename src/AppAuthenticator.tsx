import { type ReactNode } from 'react'
import {
  Authenticator,
  useTheme,
  View,
  Text,
  useAuthenticator,
  CheckboxField,
} from '@aws-amplify/ui-react'
import { Avatar, Flex, theme, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import iconImg from '@/assets/icon.png'
import ThemeTypeSwitch from '@/components/ThemeTypeSwitch.tsx'
import ToForgotPasswordButton from '@/components/login/ToForgotPasswordButton.tsx'
import Rubies from '@/layouts/HomeLayout/Rubies.tsx'
import styles from '@/pages/Home/CustomFont.module.css'

const components = {
  Header() {
    return (
      <Flex vertical align="center" style={{ margin: 30 }}>
        <Avatar src={iconImg} size={150} />
        <Typography.Title
          level={3}
          className={styles.toolTitleFont}
          style={{ margin: '0 0 30px' }}
        >
          <Rubies name="Memento Nexus" kana="メメント ネクサス" />
        </Typography.Title>
        <ThemeTypeSwitch />
      </Flex>
    )
  },
  Footer() {
    const { tokens } = useTheme()

    return (
      <View
        textAlign="center"
        padding={tokens.space.large}
        style={{ backgroundColor: 'transparent' }}
      >
        <Text color={tokens.colors.neutral[80]}>
          &copy; All Rights Reserved
        </Text>
      </View>
    )
  },
  SignIn: {
    Footer: () => (
      <View textAlign="center" style={{ backgroundColor: 'transparent' }}>
        <ToForgotPasswordButton />
      </View>
    ),
  },
  SignUp: {
    FormFields() {
      const { validationErrors } = useAuthenticator()
      return (
        <>
          <Authenticator.SignUp.FormFields />
          <CheckboxField
            errorMessage={validationErrors.acknowledgement as string}
            hasError={Boolean(validationErrors.acknowledgement)}
            name="acknowledgement"
            value="yes"
            label={
              <div className="flex">
                <a
                  href="/rules"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-500"
                >
                  利用規約
                </a>
                <span>に同意する</span>
              </div>
            }
          />
        </>
      )
    },
  },
} as const

interface Props {
  children: ReactNode
}
export default function AppAuthenticator({ children }: Props) {
  const { token } = theme.useToken()
  return (
    <>
      <Helmet>
        <style>{`body { background-color: ${token.colorBgLayout}; }`}</style>
      </Helmet>
      <Authenticator
        variation="default"
        components={components}
        services={{
          async validateCustomSignUp(formData) {
            if (!formData.acknowledgement) {
              return {
                acknowledgement: '内容をお読みの上、チェックを入れてください',
              }
            }
          },
        }}
      >
        {children}
      </Authenticator>
    </>
  )
}
