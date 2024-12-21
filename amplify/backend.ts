import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource'
import { data } from './data/resource'

const backend = defineBackend({
  auth,
  data,
})

const { cfnUserPool } = backend.auth.resources.cfnResources

// パスワードポリシーを変更
cfnUserPool.policies = {
  passwordPolicy: {
    minimumLength: 8,
    requireLowercase: true,
    requireNumbers: true,
    requireUppercase: true,
    requireSymbols: false,
    temporaryPasswordValidityDays: 3,
  },
}

// ユーザー名でログインするようにする
cfnUserPool.usernameAttributes = []
