import React from 'react'
import Login from './components/Login'

import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
  Box,
  Flex,
  Link,
  Icon
} from '@chakra-ui/core'

export default function App ({ access_token }) {

  const Footer = () => (
      <footer className="App-footer">
        <Flex width="full" align="center" justifyContent="center">
          <Box
            p={70}
            borderWidth={0}
            borderRadius={0}
          >
            Icons made by&nbsp;
            <Link href="https://www.flaticon.com/authors/freepik" title="Freepik" isExternal>
              Freepik&nbsp;
            </Link> 
            from&nbsp;
            <Link href="https://www.flaticon.com/" title="Flaticon" isExternal>
                www.flaticon.com <Icon name="external-link" mx="2px" />&nbsp;
            </Link>
          </Box>
        </Flex>
      </footer>
  )

  return (
      <ThemeProvider theme={theme}>
        <CSSReset />
        <ColorModeProvider>
          <Login access_token={access_token}/>
          <Footer/>
        </ColorModeProvider>
      </ThemeProvider>
    ) 
}
