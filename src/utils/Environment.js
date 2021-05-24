class Environment {
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