import { defineAuth } from '@aws-amplify/backend'

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: 'CODE',
      verificationEmailSubject:
        'amplify-vite-react-sampleにようこそ! メルアドを認証しましょう!',
      verificationEmailBody: (code) => `認証コードは ${code()} です。`,
      userInvitation: {
        emailSubject: 'amplify-vite-react-sampleにようこそ!',
        emailBody: (user, code) =>
          `あなたのユーザー名は ${user()} で、\n仮パスワードは ${code()} です。`,
      },
    },
  },
  userAttributes: {
    preferredUsername: {
      mutable: false,
      required: false,
    },
    nickname: {
      mutable: true,
      required: true,
    },
  },
})
