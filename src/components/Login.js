import React from 'react';

import {api} from '../services/Api';
import '../styles/login.css'

/*
async function auth() {
    const response = await api.basicLogin('klubas', 'klubaspwd')
    return await response
}
*/

class Login extends React.Component {
    auth = async () => {
        const response = await api.basicLogin('klubas', 'klubaspwd')
        return response 
    }

    render(){
        return <div>
            <div className="title">
                <p><strong>Login</strong></p>
            </div>
            <div>
                <form className="loginForm">
                    <label htmlFor="username" className="loginLabel">username</label><br/>
                    <input type="text" id="username" name="username" className="loginField"/><br/>
                    <label htmlFor="password" className="loginLabel">password</label><br/>
                    <input type="password" id="password" name="password" className="loginField"/><br/><br/>
                    <input type="submit" value="login" hidden={false}/>
                </form>
            </div>
        </div>
    }
}
export default Login;
