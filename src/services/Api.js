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
                'Authorization': 'Bearer ' + window.localStorage.getItem('access_token')
            }
            ,body: JSON.stringify(data)
        }
        let response;
        try {
            await fetch(url, settings)
            .then(response => response.json())
            .then(jsonData => {
                response = jsonData.message
                this.token = response.token
                return response
            })
            console.log(response.description)
            return response
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
        let response;
    
        try {
            await fetch(url, settings)
            .then(response => response.json())
            .then(jsonData => {
                response = jsonData.message
                this.token = response.token
                return response
            })
            console.log(response.description)
            return response
        } catch (e) {
            console.log(e)
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





