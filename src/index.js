import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import theme from "./utils/theme"

import {validateLocalNetwork, setLayout} from './utils/scripts'
 
import {
  ColorModeScript,
  ChakraProvider
} from '@chakra-ui/react'

import * as serviceWorker from './serviceWorker'

setLayout()
validateLocalNetwork()

const app_layout = window.localStorage.getItem('layout')
const token = window.localStorage.getItem('access_token')

ReactDOM.render(
  <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
      <ChakraProvider  theme={theme}>
        <App access_token={token} appLayout={app_layout}/>
      </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


process.env.NODE_ENV === 'production' && process.env.REACT_APP_DEBUG !== 'true'
  ? serviceWorker.register() 
  : serviceWorker.unregister()
