import React from 'react'

import {api} from '../services/Api'
import '../styles/login.css'


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '', 
            password: ''
        }
    }

    handleChange = (event) => {
        let name = event.target.name
        let val = event.target.value
        this.setState({[name]: val})
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const auth = async (username, password) => {
            const response = await api.basicLogin(username, password)
            await window.localStorage.setItem('access_token', response.response);
        }
        auth(this.state.username, this.state.password)
    }

    render(){
        return <div>
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
    }
}
export default Login
