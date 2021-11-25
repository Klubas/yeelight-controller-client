class Environment {
    constructor() {}

    setThemeMode(){
        window.localStorage.setItem(
            'darkMode', process.env.REACT_APP_DEFAULT_COLOR_MODE === 'dark' ? true : false)
    }

    setLayout(){
        let layout = process.env.REACT_APP_FORCE_LAYOUT
        if (process.env.REACT_APP_FORCE_LAYOUT === 'full' || process.env.REACT_APP_FORCE_LAYOUT === 'minimal') {
            layout = process.env.REACT_APP_FORCE_LAYOUT
        } else {
            const dimensions = this.getWindowDimensions()
            const height = dimensions.height
            const width = dimensions.width

            /*alert(dimensions.width + 'x' + dimensions.height)*/

            if (width <= 480 && height <= 320) {
                layout = 'minimal'
                this.disableElementSelection()
            } else {
                layout = 'full'
            }
        }
        window.localStorage.setItem('layout', layout)
    }
    
    validateLocalNetwork() {
        
        const local_token = process.env.REACT_APP_LOCAL_TOKEN
        
        const isLocalhost = Boolean(
            window.location.hostname === 'localhost' ||
              // [::1] is the IPv6 localhost address.
              window.location.hostname === '[::1]' ||
              // 127.0.0.0/8 are considered localhost for IPv4.
              window.location.hostname.match(
                /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
              )
          );

        if (local_token && isLocalhost) {
            
            window.localStorage.setItem('access_token', local_token)
            
        }
    }

    getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
    }

    disableElementSelection(){
        window.onload = function() {
            document.onselectstart = function() {return false;}
            document.onmousedown = function() {return false;} 
        }
    }
}



export var client_env = new Environment()
