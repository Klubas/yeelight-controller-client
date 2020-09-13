import React from 'react';
import Login from '../components/Login'
import Logout from '../components/Logout'
import Card from '../components/Card'
import {api} from '../services/Api'


const currentLocation = window.location.href
console.log(currentLocation)

window.addEventListener('storage',e => console.log(e))

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = { data: [], cards: 0 }
    this.token = window.localStorage.getItem('access_token')
  }

  renderHeader = () => {
    return (
      <header className="App-header">
        <Logout/><br/>
      </header>
    )
  }

  renderCards = () => {
    console.log(this.state)
    return (
      <div>
        <ul className="nobullet">
        {
          this.state.data.map(
            (item) => 
              <li key={item.id} >
                <Card 
                  ip={item.ip} 
                  name={item.name}
                  model={item.model}
                  power={item.properties.power}
                  color={item.properties.rgb}
                />
              </li>)
        }
        </ul>
      </div>
    )
  }

  renderLogin = () => {
    return (
      <div className="App-Login">
        <Login/>
      </div>
    )
  }

  componentDidMount = () => {
    if (this.token){      
      (async () => {
        const response = await api.getAllBulbs()
        if (response.status === 'SUCCESS') {
          await new Promise(accept => this.setState(
            {
              data: response.response, 
              cards: response.response.length
            }, 
          accept ))
        }
      })()}
  }

  render() {
    if (this.token) {
      
      let renderize = (<div className="App">{ this.renderHeader() }</div>)

      if (this.state.cards > 0) { 
        renderize = (
          <div>
            {renderize}
            <div>{this.renderCards()}</div>
          </div>
        )
      }

      return renderize
    } 
    return this.renderLogin()
  }
}

export default App;
