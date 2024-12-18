import React from 'react'
import ReactDOM from 'react-dom/client'
import { Authenticator } from '@aws-amplify/ui-react'
import { translations } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import { I18n } from 'aws-amplify/utils'
import outputs from '../amplify_outputs.json'
import App from '@/App.tsx'
import '@aws-amplify/ui-react/styles.css'
import '@/main.css'
import './i18n/configs'

Amplify.configure(outputs)

const dict = {
  ja: {
    'Your passwords must match': 'パスワードが一致しません',
    'Enter your email': 'メールアドレス',
    Nickname: '表示ユーザー名',
    'Enter your Nickname': '表示ユーザー名を入力',
  },
}

I18n.putVocabularies(dict)
I18n.putVocabularies(translations)
I18n.setLanguage('ja')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </React.StrictMode>,
)
