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
        .then(response => response.json())
        .then(jsonData => response = jsonData.message)    
   
    try {
        switch (response.status) {
            case 'SUCCESS':
                return response
            case 'LOGIN_SUCCESS':
                window.localStorage.setItem('access_token', response.response)
                basic_login = null
                return response.description
            case 'LOGIN_ERROR':
                window.localStorage.removeItem('access_token')
                throw new Error(response.description)
            case 'ERROR':
                throw new Error('Unexpected error: ' + response.description)
            default:
                console.log(response)
                throw new Error(response.response)
        }
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }    
}

export const login = (username, password) => {
    basic_login = 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    return callEndpoint('POST', '/api/logon', null, basic_login)
}

export const getAllBulbs = () => {
    let fake_bulbs = (process.env.REACT_APP_FAKE_BULBS > 0 ? '?fake_bulbs=' + process.env.REACT_APP_FAKE_BULBS  : '')
    return callEndpoint('GET', '/api/bulbs' + fake_bulbs)
}

export const getBulb = (id) => {
    return callEndpoint('GET', '/api/bulb?id=' + id)
}

export const changeLampState = (id, state) => {
    return callEndpoint('POST', '/api/bulb/power?id=' + id + '&state=' + state)
}

export const changeLampColor = (id, mode, values) => {
    return callEndpoint('POST'
    , '/api/bulb/color?id=' + id + '&mode=' + mode + '&values=' + values)
}

export const changeLampName = (id, newName) => {
    return callEndpoint('PUT', '/api/bulb?id=' + id + '&new_name=' + newName)
}
