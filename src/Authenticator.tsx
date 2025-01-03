import { type ReactNode } from 'react'
import {
  Authenticator as AwsAuthenticator,
  useTheme,
  View,
  Image,
  Text,
} from '@aws-amplify/ui-react'
import ToForgotPasswordButton from '@/components/login/ToForgotPasswordButton.tsx'

const components = {
  Header() {
    const { tokens } = useTheme()

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Amplify logo"
          src="https://docs.amplify.aws/assets/logo-dark.svg"
        />
      </View>
    )
  },
  Footer() {
    const { tokens } = useTheme()

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>
          &copy; All Rights Reserved
        </Text>
      </View>
    )
  },
  SignIn: {
    Footer: () => (
      <View textAlign="center">
        <ToForgotPasswordButton />
      </View>
    ),
  },
} as const

interface Props {
  children: ReactNode
}
export default function Authenticator({ children }: Props) {
  return (
    <AwsAuthenticator variation="default" components={components}>
      {children}
    </AwsAuthenticator>
  )
}
