import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.authenticated()]),
  Todo2: a
    .model({
      content: a.string().required(),
      type: a.enum(['system', 'user']),
      next: a.string().required(),
    })
    .authorization((allow) => [allow.authenticated()]),
  NechronicaCharacter: a
    .model({
      name: a.string().required(),
      type: a.enum(['doll', 'savant', 'horror', 'legion']),
      sheetId: a.string().required(),
      sheetData: a.string().required(),
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
