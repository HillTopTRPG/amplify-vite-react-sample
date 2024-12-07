import React from "react";
import ReactDOM from "react-dom/client";
import {Authenticator, useTheme, View, Image, Text} from '@aws-amplify/ui-react'
import App from "./App.tsx";
import "./index.css";
import { I18n } from 'aws-amplify/utils';
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';
import { translations } from '@aws-amplify/ui-react';
import ToSignInButton from './components/ToSignInButton.tsx'

Amplify.configure(outputs);

const dict = {
  ja: {
    'Preferred Username': 'ユーザー名',
    'Enter your Preferred Username': 'ユーザー名を入力',
    'Your passwords must match': 'パスワードが一致しません',
  },
};

I18n.putVocabularies(dict);
I18n.putVocabularies(translations);
I18n.setLanguage('ja');

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Amplify logo"
          src="https://docs.amplify.aws/assets/logo-dark.svg"
        />
      </View>
    );
  },
  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>
          &copy; All Rights Reserved
        </Text>
      </View>
    );
  },
  SignUp: {
    Footer: () => (<View textAlign="center"><ToSignInButton /></View>),
  },
} as const;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator variation="default" components={components}>
      <App />
    </Authenticator>
  </React.StrictMode>
);
