import { Button, useAuthenticator } from '@aws-amplify/ui-react'

export default function ToSignInButton() {
  const { toSignIn: action } = useAuthenticator()
  return (
    <Button onClick={action} size="small" variation="link">
      サインインに戻る
    </Button>
  )
}
