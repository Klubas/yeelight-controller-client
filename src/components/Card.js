import React from 'react'
import '../styles/card.css'
import bulb_on from '../images/bulb_on.svg'
import bulb_off from '../images/bulb_off.svg'
import {api} from '../services/Api'

class ColorType extends React.Component {
    constructor(props) {
        super(props)
        this.type = props.type
    }
}

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.id = props.id
        this.ip = props.ip
        this.name = props.name
        this.model = props.model
        this.state = {
            power: props.power === 'on' ? true : false,
            color: props.rgb,
            icon : props.power === 'on' ? bulb_on : bulb_off
        }
    }

    power = (state) => {
        try {
            api.changeLampState(this.ip, state)
            this.setState(
                {
                    power: (state === 'on' ? true : false),
                    icon: (state === 'on' ? bulb_on : bulb_off)
                }
            )
        }
        catch (e){
            console.log(e)
        }
    }

    handleBulbClick= (event) => {
        this.state.power ? this.power('off') : this.power('on')
    }

    render() {
        return (
            <div>
                <div>
                <img src={this.state.icon} alt="bulb_icon" onClick={ this.handleBulbClick } /><br/>
                </div>
                <div>
                    <label>{this.ip}</label><br></br>
                    <label>{this.name}</label>
                </div>
            </div>
        )
    }
}


export default Card
