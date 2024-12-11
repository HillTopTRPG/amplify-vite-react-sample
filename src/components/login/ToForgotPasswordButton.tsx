import { useAuthenticator, Link } from '@aws-amplify/ui-react'

export default function ToForgotPasswordButton() {
  const { toForgotPassword: action } = useAuthenticator()
  return <Link onClick={action}>パスワードをお忘れの方はこちら</Link>
}
