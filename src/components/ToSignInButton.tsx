import {Button, useAuthenticator} from '@aws-amplify/ui-react'

export default function ToSignInButton() {
  const { toSignIn } = useAuthenticator();
  return (
    <Button
      onClick={toSignIn}
      size="small"
      variation="link"
    >
      サインインに戻る
    </Button>
  );
}
