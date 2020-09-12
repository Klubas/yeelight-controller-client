import React from 'react';
import '../styles/card.css'
import icon from '../images/bulb.svg'
import {api} from '../services/Api';


class Card extends React.Component {
    constructor(ip, name) {
        super()
        this.ip = ip
        this.name = name
    }

    power = (state) => {
        api.changeLampState(this.ip, state);
    }

    render() {
        return (
            <div>
                <button onClick={() => this.power('toggle')}>
                    Power Toggle!
                </button>
            </div>
        )
    }
}


export default Card;
