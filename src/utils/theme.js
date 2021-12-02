// theme.js
import { extendTheme } from "@chakra-ui/react"
let defaultColorMode = process.env.REACT_APP_DEFAULT_COLOR_MODE ?  process.env.REACT_APP_DEFAULT_COLOR_MODE : 'light'
const config = {
  initialColorMode: defaultColorMode,
  useSystemColorMode: false,
}

const theme = extendTheme({ config })
export default theme