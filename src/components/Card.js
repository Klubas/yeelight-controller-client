import React, {useState} from 'react'
import bulb_on from '../images/bulb_on.svg'
import bulb_off from '../images/bulb_off.svg'
import {api} from '../utils/Api'


export default function Card ({ bulbId, bulbIP, bulbName, bulbModel, bulbPower, bulbColor }) {
    const [id, setId] = useState(bulbId);
    const [ip, setIP] = useState(bulbIP);
    const [name, setName] = useState(bulbName);
    const [model, setModel] = useState(bulbModel);
    const [power, setPower] = useState(bulbPower === 'on' ? true : false);
    const [color, setColor] = useState(bulbColor);
    const [icon, setIcon] = useState(bulbPower === 'on' ? bulb_on : bulb_off);

    const handleBulbClick= (event) => {

        const togglePower = (state) => {
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

        power ? togglePower('off') : togglePower('on')
    }


    return (
        <div>
            <div>
            <img src={icon} alt="bulb_icon" onClick={ handleBulbClick } /><br/>
            </div>
            <div>
                <label className="bulbIP">{ ip }</label><br></br>
                <label className="bulbName">{ name }</label><br></br>
                <label className="bulbModel">{ model }</label>
            </div>
        </div>
    )
    
}
