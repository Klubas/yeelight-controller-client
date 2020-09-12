class Api {
    constructor(rootAddress) {
        this.rootAddress = rootAddress
        console.log(rootAddress)
        this.token = null
    }

    callEndpoint = async (HTTPVerb, endpoint, params = null, data = null, token = null) => {
        const url = this.rootAddress + endpoint
        const settings = {
            method: HTTPVerb,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            }
            ,body: JSON.stringify(data)
        }
        try {
            const fetchResponse = await fetch(url, settings)
            return await fetchResponse.json()
        } catch (e) {
            console.log(e)
        }
    }

    basicLogin = async (username, password) => {
        const url = this.rootAddress + '/api/logon'
        const auth = Buffer.from(username + ':' + password).toString('base64')
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic ' + auth
            },
        }
    
        try {
            const fetchResponse = await fetch(url, settings)
            const data = await fetchResponse.json()
            this.token = await data.message.response
            return data.message
        } catch (e) {
            await console.log(e)
        }
    }

    changeLampState = (ip, state) => {
        return api.callEndpoint('POST', '/api/bulb/power?ip=' + ip + '&state=' + state)
    }
    
    changeLampColor = (ip, hexColor) => {
        const rgbColor = convertHexToRGB(hexColor)
        const color = rgbColor.r.toString().concat(" ", rgbColor.g.toString(), " ", rgbColor.b.toString())
        return api.callEndpoint('color', color)
    }
}

function convertHexToRGB(hexColor) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor)
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}


export var api = new Api('http://localhost:5000')




/*
const btnSwitch = document.getElementById('btnSwitch')
btnSwitch.addEventListener('click',
	function(){changeLampState(ip='192.168.1.19')}
)

var colorLightBulb = document.getElementById('colorLightBulb')
colorLightBulb.addEventListener('change',
    function(){
        var newColor = colorLightBulb.value
        changeLampColor(ip='192.168.1.19', newColor)
    }
)
*/





