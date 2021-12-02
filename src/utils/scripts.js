/* Env functions */
export const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    }
}

export const disableElementSelection = () => {
    window.onload = function() {
        document.onselectstart = function() {return false;}
        document.onmousedown = function() {return false;} 
    }
}

export const setLayout = () => {
    let layout = process.env.REACT_APP_FORCE_LAYOUT
    if (process.env.REACT_APP_FORCE_LAYOUT === 'full' 
        || process.env.REACT_APP_FORCE_LAYOUT === 'minimal') 
    {
        layout = process.env.REACT_APP_FORCE_LAYOUT
    } else {
        const dimensions = getWindowDimensions()
        const height = dimensions.height
        const width = dimensions.width

        if (width <= 480 && height <= 320) {
            layout = 'minimal'
            //disableElementSelection()
        } else {
            layout = 'full'
        }
    }
    window.localStorage.setItem('layout', layout)
}

export const validateLocalNetwork = () => {
    const local_token = process.env.REACT_APP_LOCAL_TOKEN

    if (local_token) {
        let url = window.location.href
        url = url.split('/')
        url = url[2].split(':')
        url = url[0]

        url = url === 'localhost' ? '127.0.0.1' : url
        url = url.split('.')
        url = url[0]

        if (url === '192' || url === '127') {
            window.localStorage.setItem('access_token', local_token)
        }
    }
}

/** Color functions */
const tinycolor = require("tinycolor2")

export const colorToRgb = (color) => {
    color = tinycolor(color)
    return color.toRgb()
}

export const colorToHsv = (color) => {
    color = tinycolor(color)
    return color.toHsv()
}

export const colorToHex = (color) => {
    color = tinycolor(color)
    return color.toHexString()
}

export const kelvinToHex = (kelvin) => {
    let color_temp = require("color-temperature")
    let color_rgb = color_temp.colorTemperature2rgb(kelvin);

    let color = colorToHex({
        r: color_rgb.red, 
        g: color_rgb.green, 
        b: color_rgb.blue
    })

    return colorToHex(color)
}
