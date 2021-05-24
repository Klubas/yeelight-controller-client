import React, { useState } from 'react'
import Login from './components/Login'
import ThemeToggler from './components/ThemeToggler'

import {
  Box,
  Flex,
  Link,
  Icon,
  IconButton
} from '@chakra-ui/react'
import { RepeatIcon, SmallCloseIcon, ExternalLinkIcon } from '@chakra-ui/icons'


export default function App ({ access_token, appLayout }) {
  const [layout, setLayout] = useState(appLayout)

  const Header = () => (
    <header className="App-header">
      <Flex width="100%" justify="center">
          <Box textAlign="center" p={5} >
            <ThemeToggler />
          </Box>
          <Box textAlign="center" p={5} >
            <IconButton 
                size="lg"
                icon={<RepeatIcon/>}
                variant="ghost" 
                verticalAlign="top"
                onClick={
                  () => {
                    window.location.reload()
                  }
                }
            />
          </Box>
              <Box textAlign="center" p={5} visibility="visible">
                <IconButton 
                  size="lg"
                  icon={<SmallCloseIcon/>}
                  variant="ghost" 
                  verticalAlign="top"
                  onClick={
                    () => {
                      window.localStorage.removeItem('access_token')
                      window.location.reload()
                    }
                  }
                />
              </Box>
        </Flex>
    </header>
  )

  const Footer = () => (
      <footer className="App-footer">
        <Flex width="full" align="center" justifyContent="center">
          <Box
            p="20px"
            borderWidth={0}
            borderRadius={0}
          >
            Icons made by&nbsp;
            <Link href="https://www.flaticon.com/authors/freepik" title="Freepik" isExternal>
              Freepik<br></br>
            </Link> 
            from&nbsp;
            <Link href="https://www.flaticon.com/" title="Flaticon" isExternal>
                www.flaticon.com <ExternalLinkIcon mx="2px" />&nbsp;
            </Link>
          </Box>
        </Flex>
      </footer>
  )

  const App = () => (
    layout === 'full' ? 
      <>
        <Header/>
          <Login access_token={access_token} appLayout={layout}/>
        <Footer/>
      </>
    :
      <Login access_token={access_token} appLayout={layout}/>
  )

  return (<App/>) 
}
