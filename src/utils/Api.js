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
    
    changeRgbLampColor = (ip, hexColor) => {
        return api.callEndpoint('POST', '/api/bulb/color?ip=' + ip + '&mode=rgb&values=' + hexColor.replace('#', ''))
    }

    changeHsvLampColor = (ip, values) => {
        return api.callEndpoint('POST', '/api/bulb/color?ip=' + ip + '&mode=hsv&values=' + values[0] + ',' + values[1] + ',' + values[2])
    }

    changeLampTemp = (ip, temp) => {
        return api.callEndpoint('POST', '/api/bulb/color?ip=' + ip + '&mode=temp&values=' + temp)
    }

    changeLampBrightness = (ip, brightness) => {
        return api.callEndpoint('POST', '/api/bulb/color?ip=' + ip + '&mode=bright&values=' + brightness)
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

let api_address = process.env.REACT_APP_API_ADDRESS ? process.env.REACT_APP_API_ADDRESS : window.location.href
export var api = new Api(api_address)
console.log(api_address)
