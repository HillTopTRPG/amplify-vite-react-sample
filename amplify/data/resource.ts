import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.authenticated()]),
  User: a
    .model({
      userName: a.string().required(),
      setting: a.string().required(),
    })
    .authorization((allow) => [allow.authenticated()]),
  NechronicaCharacter: a
    .model({
      name: a.string().required(),
      additionalData: a.string().required(),
      sheetData: a.string().required(),
      owner: a.string().required(),
      public: a.boolean().required(),
    })
    .authorization((allow) => [allow.authenticated()]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
})
