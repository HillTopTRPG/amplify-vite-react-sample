import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  User: a
    .model({
      userName: a.string().required(),
      displayName: a.string().required(),
      setting: a.string().required(),
    })
    .authorization((allow) => [
      allow.authenticated('identityPool'),
      allow.guest().to(['read']),
    ]),

  CharacterGroup: a
    .model({
      system: a.string().required(),
      name: a.string().required(),
      additionalData: a.string().required(),
      characterIds: a.string().required(),
      owner: a.string().required(),
      public: a.boolean().required(),
    })
    .authorization((allow) => [
      allow.authenticated('identityPool'),
      allow.guest().to(['read']),
    ]),

  NechronicaCharacter: a
    .model({
      name: a.string().required(),
      additionalData: a.string().required(),
      sheetData: a.string().required(),
      owner: a.string().required(),
      public: a.boolean().required(),
    })
    .authorization((allow) => [
      allow.authenticated('identityPool'),
      allow.guest().to(['read']),
    ]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
})
