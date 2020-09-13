import React from 'react'

import '../styles/login.css'


class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '', 
            password: ''
        }
    }

    logOff = () => {
        window.localStorage.removeItem('access_token')
        window.location.reload(false)
    }

    handleClick = (event) => {
        this.logOff()
    }

    render() {
        return (
            <div className="Logout">
                <button value="aaa" onClick={ this.handleClick }>Logout</button>
            </div>
        )
    }
}

export default Logout
