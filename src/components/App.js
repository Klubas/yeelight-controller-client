import React from 'react';
import Login from '../components/Login'
import Logout from '../components/Logout'
import Card from '../components/Card'
import {api} from '../services/Api'

import logo from '../images/bulb.svg';
import { render } from '@testing-library/react';
const currentLocation = window.location.href
console.log(currentLocation)

class App extends React.Component {
  render() {
    if (window.localStorage.getItem('access_token')) {
      return (
        <div className="App">
          <header className="App-header">
            <Logout/>
          </header>
          <div className="Card-list">
            <Card/>
          </div>
        </div>
      )
    } else {
      return (
        <div className="App">
          <div className="App-Login">
            <Login/>
          </div>
        </div>
      )
    }
  }
}

export default App;
