class Api {
    constructor(rootAddress) {
        this.rootAddress = rootAddress
    }

    callEndpoint = async (method, endpoint, data = null) => {
        const url = this.rootAddress + endpoint
        const settings = {
            method: method,
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

        let response
        await fetch(url, settings)
        .then(response => validateResponse(response))
        .then(jsonData => response = jsonData.message)
       
        try {
            if (response.status === 'SUCCESS') {
                return response
            } else {
                throw new Error (response.description)
            } 

        } catch (error) {
            console.log(error)
            throw new Error('Unexpected error')
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

        let response

        await fetch(url, settings)
            .then(response => validateResponse(response))
            .then(jsonData => response = jsonData.message
        )
        try {
            if (response.status === 'LOGIN_SUCCESS') {
                window.localStorage.setItem('access_token', response.response)
                return response.description
            } else {
                throw new Error (response.description)
            } 
        } catch (error) {
            throw new Error ('Unexpected error')
        }
    }

    getAllBulbs = () => {
        let fake_bulbs = (process.env.REACT_APP_FAKE_BULBS 
                            ? '?fake_bulbs=' + process.env.REACT_APP_FAKE_BULBS 
                            : '')
        
        return api.callEndpoint('GET', '/api/bulbs' + fake_bulbs)
    }

    getBulb = (ip, id) => {
        console.log(id)
        return api.callEndpoint('GET', '/api/bulb?ip=' + ip + '&id=' + id)
    }

    changeLampState = (ip, state, id) => {
        console.log(id)
        return api.callEndpoint('POST', '/api/bulb/power?ip=' + ip + '&state=' + state)
    }
    
    changeLampColor = (ip, hexColor) => {
        const rgbColor = convertHexToRGB(hexColor)
        const color = rgbColor.r.toString().concat(" ", rgbColor.g.toString(), " ", rgbColor.b.toString())
        return api.callEndpoint('color', color)
    }

    changeLampName = (ip, newName) => {
        return api.callEndpoint('PUT', '/api/bulb?ip=' + ip + '&new_name=' + newName)
    }
}

const validateResponse = (response) => {
    const [status, statusText] = [response.status, response.statusText]
    try {
        if (response && response.status !== 401) {
            return response.json()
        } else if (status === 401) {
            window.localStorage.removeItem('access_token')
            throw new Error('Expired credentials')
        } else {
            throw new Error('Unexpected error ' + statusText)
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
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

let api_address = process.env.REACT_APP_API_ADDRESS ? process.env.REACT_APP_API_ADDRESS : window.location.href
export var api = new Api(api_address)
console.log(api_address)
