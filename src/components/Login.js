import React from 'react'

import {api} from '../services/Api'
import '../styles/login.css'


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '', 
            password: '',
            logged: false
        }
    }

    auth = async (username, password) => {
        const response = await api.basicLogin(username, password)
        try {
            if (response && response.status === 'LOGIN_SUCCESS') {
                await window.localStorage.setItem('access_token', response.response);
                this.setState({logged: true})
                window.location.reload(false)
            } else {
                window.alert(response)
            }
        } catch (e) {
            window.alert(response)
        }

    }

    handleChange = (event) => {
        let name = event.target.name
        let val = event.target.value
        this.setState({[name]: val})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.auth(this.state.username, this.state.password)
    }

    render(){
        if (! this.state.logged) {
            return <div className="App-Login">
                <div className="title">
                    <p><strong>Login</strong></p>
                </div>
                <div>
                    <form className="loginForm" onSubmit={ this.handleSubmit }>
                        <label className="loginLabel">username</label><br/>
                            <input 
                                type="text"
                                name="username"
                                className="loginField" 
                                onChange={ this.handleChange } 
                                value={this.state.username.value}/>
                            <br/>
                        <label className="loginLabel">password</label><br/>
                            <input 
                                type="password"
                                name="password"
                                className="loginField" 
                                onChange={ this.handleChange } 
                                value={this.state.password.value}/>
                            <br/>
                        <br/>
                        <input type="submit" value="login" hidden={false}/>
                    </form>
                </div>
            </div>
        } else { 
            return null 
        }
    }
}
export default Login
