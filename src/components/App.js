import React from 'react';
import Login from '../components/Login'
import Logout from '../components/Logout'
import Card from '../components/Card'
import {api} from '../services/Api'

window.addEventListener('storage',e => console.log(e))

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      data: [], 
      cards: 0 , 
      token: props.token
    }
  }

  renderHeader = () => {
    return (
      <li key="header">
      <header className="App-header">
        <Logout/><br/>
      </header>
      </li>
    )
  }

  renderFooter = () => {
    return (
      <li key="footer">
        <footer className="App-footer">
          Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </footer>
      </li>
    )
  }

  renderCards = () => {
    return (
      <li key="cards">
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
      </li>
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
    if (this.state.token){      
      (async () => {
        try {
          const response = await api.getAllBulbs()
          if (response && response.status === 'SUCCESS') {
            await new Promise(accept => this.setState(
              {
                data: response.response, 
                cards: response.response.length
              }, 
            accept ))
          } else if (response === null){
              console.log(response)
              window.localStorage.removeItem('access_token')
              window.location.reload(false)
          }
      } catch (e) {
        console.log(e)
      }
      })()}
  }

  render() {
    if (this.state.token) {
      let renderize = []
      renderize.push(this.renderHeader())
      if (this.state.cards > 0) { 
        renderize.push(this.renderCards())
      }
      renderize.push(this.renderFooter())
      
      return <div className="App">
        <ul className="nobullet">{renderize}</ul>
      </div>
    } 
    return (
      <div>
        {this.renderLogin()}
        {this.renderFooter()}
      </div>
    )
  }
}

export default App;
