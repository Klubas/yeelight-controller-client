import React from 'react'
import '../styles/card.css'
import icon from '../images/bulb.svg'
import {api} from '../services/Api'


class Card extends React.Component {
    constructor(ip, name, props) {
        super(props)
        this.ip = '192.168.1.19'
        this.name = name
    }

    power = (state) => {
        api.changeLampState(this.ip, state)
    }

    handleBulbClick= (event) => {
        this.power('toggle')
    }

    render() {
        return (
            <div>
                <img src={icon} alt="bulb icon"/>
                <button onClick={ this.handleBulbClick }>
                    Power Toggle!
                </button>
            </div>
        )
    }
}


export default Card
