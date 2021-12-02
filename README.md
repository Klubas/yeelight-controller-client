# YeelightHub Client

Client for YeelightHub written in React with Chakra-ui

## Todo

* Change scenes
* Better view for multiple bulbs in minimal layout
* Webhook/websocket to auto update lamp status

## Environment Variables

    #.env
    REACT_APP_API_ADDRESS=http://192.168.0.108:5000     # If you want a different yeelight-controlle-api addres. Default is window.location.href
    REACT_APP_FAKE_BULBS=3                              # add fake bulbs, for testing purposes
    REACT_APP_LOCAL_TOKEN=local_network                 # Defined if you want to accepet requests from local network without authentication. Must be configured in the api too.
    REACT_APP_DEFAULT_COLOR_MODE=dark                   # Default color mode (dark|light)
    REACT_APP_FORCE_LAYOUT=full                         # Force layout (full|minimal|auto). Default is 'auto'

## Credits

Login screen ripped of https://github.com/amandeepmittal/blog-examples
