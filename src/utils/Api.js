let basic_login = null
const rootAddress = process.env.REACT_APP_API_ADDRESS 
                    ? process.env.REACT_APP_API_ADDRESS 
                    : window.location.href

console.log(rootAddress)

const getAuth = (auth) => {
    switch (auth) {
        case 'Bearer': 
            return 'Bearer ' + window.localStorage.getItem('access_token')
        default: 
            return auth
    }
}

const callEndpoint = async (method, endpoint, data = null, auth = 'Bearer') => {
    const url = rootAddress + endpoint
    const settings = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/html',
            'Authorization': getAuth(auth)
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
        switch (response.status) {
            case 'SUCCESS':
                return response
            case 'LOGIN_SUCCESS':
                window.localStorage.setItem('access_token', response.response)
                basic_login = null
                return response.description
            default:
                throw new Error (response.description)
        }
    } catch (error) {
        console.log(error)
        throw new Error('Unexpected error')
    }    
}

const validateResponse = (response) => {
    const [status, statusText] = [response.status, response.statusText]
    try {
        if (response && response.status !== 401) {
            return response.json()
        } else if (status === 401) {
            window.localStorage.removeItem('access_token')
            throw new Error('Invalid credentials')
        } else {
            throw new Error('Unexpected error ' + statusText)
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

export const login = (username, password) => {
    basic_login = 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    return callEndpoint('POST', '/api/logon', null, basic_login)
}

export const getAllBulbs = () => {
    let fake_bulbs = (process.env.REACT_APP_FAKE_BULBS ? '?fake_bulbs=' + process.env.REACT_APP_FAKE_BULBS  : '')
    return callEndpoint('GET', '/api/bulbs' + fake_bulbs)
}

export const getBulb = (ip) => {
    return callEndpoint('GET', '/api/bulb?ip=' + ip)
}

export const changeLampState = (ip, state, id) => {
    return callEndpoint('POST', '/api/bulb/power?ip=' + ip + '&state=' + state)
}

export const changeLampColor = (ip, mode, values) => {
    return callEndpoint('POST', '/api/bulb/color?ip=' + ip + '&mode=' + mode + '&values=' + values)
}

export const changeLampName = (ip, newName) => {
    return callEndpoint('PUT', '/api/bulb?ip=' + ip + '&new_name=' + newName)
}
