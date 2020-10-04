import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

const token = window.localStorage.getItem('access_token')

ReactDOM.render(
  <React.StrictMode>
    <App access_token={token}/>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

process.env.NODE_ENV === 'production' 
  ? serviceWorker.register() 
  : serviceWorker.unregister()
