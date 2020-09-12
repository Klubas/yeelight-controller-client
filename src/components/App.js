import React from 'react';
import Login from '../components/Login'
import Card from '../components/Card'
import {api} from '../services/Api'

import logo from '../images/bulb.svg';
const currentLocation = window.location.href
console.log(currentLocation)

function App() {
  if (window.localStorage.getItem('access_token')) {
    return (
      <div className="App">
        <div className="App-header">
          <Card/>
        </div>
      </div>
    )
  } else {
    return (
      <div className="App">
        <div className="App-header">
          <Login/>
        </div>
      </div>
    )
  }
}

export default App;
