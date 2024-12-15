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
import { ThemeProvider } from '@/context/theme.ts'
import './i18n/configs'

Amplify.configure(outputs)

const dict = {
  ja: {
    'Preferred Username': 'ユーザー名',
    'Enter your Preferred Username': 'ユーザー名を入力',
    'Your passwords must match': 'パスワードが一致しません',
    'Enter your email': 'メールアドレス',
  },
}

I18n.putVocabularies(dict)
I18n.putVocabularies(translations)
I18n.setLanguage('ja')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Authenticator.Provider>
        <App />
      </Authenticator.Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
