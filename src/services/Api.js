class Api {
    constructor(rootAddress) {
        this.rootAddress = rootAddress
        this.token = null
    }

    callEndpoint = async (HTTPVerb, endpoint, data = null) => {
        const url = this.rootAddress + endpoint
        const settings = {
            method: HTTPVerb,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'text/html',
                'Authorization': 'Bearer ' + window.localStorage.getItem('access_token')
            }
        }

        if (data){
            settings.headers['Content-Type'] = 'application/json'
            settings.body = JSON.stringify(data)
        }

        let response;
        try {
            await fetch(url, settings)
            .then(response => response.json())
            .then(jsonData => {
                response = jsonData.message
            })
            return response
        } catch (e) {  
            return null
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
            return response
        } catch (e) {
            return 'Não foi possível realizar o login!'
        }
    }

    getAllBulbs = () => {
        return api.callEndpoint('GET', '/api/bulbs')
    }

    getBulb = (ip) => {
        return api.callEndpoint('GET', '/api/bulb?ip=' + ip)
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

let api_location
if (process.env.NODE_ENV === 'production') {
    api_location = window.location.href
    api_location = api_location.slice(0, api_location.length-1)
} else {
    api_location = process.env.REACT_APP_API_ADDRESS
}
export var api = new Api(api_location)
