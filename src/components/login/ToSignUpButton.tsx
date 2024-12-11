import { Button, useAuthenticator } from '@aws-amplify/ui-react'

export default function ToSignUpButton() {
  const { toSignUp: action } = useAuthenticator()
  return (
    <Button onClick={action} size="small" variation="link">
      アカウントを作る
    </Button>
  )
}
