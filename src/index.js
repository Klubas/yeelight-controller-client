

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import {client_env} from './utils/Environment'
 
import {
  ColorModeProvider
} from '@chakra-ui/core'

import * as serviceWorker from './serviceWorker'

client_env.validateLocalNetwork()
client_env.setLayout()
client_env.setThemeMode()

const app_layout = window.localStorage.getItem('layout')
const token = window.localStorage.getItem('access_token')

ReactDOM.render(
  <React.StrictMode>
    <ColorModeProvider >
      <App access_token={token} appLayout={app_layout}/>
    </ColorModeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

process.env.NODE_ENV === 'production' 
  ? serviceWorker.register() 
  : serviceWorker.unregister()
