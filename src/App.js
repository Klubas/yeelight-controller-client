import React, { useState, useCallback } from 'react'
import Login from './components/Login'
import CardList from './components/CardList'
import ThemeToggler from './components/ThemeToggler'

import {
  Box,
  Flex,
  Link,
  IconButton
} from '@chakra-ui/react'

import { 
  RepeatIcon, 
  SmallCloseIcon, 
  ExternalLinkIcon 
} from '@chakra-ui/icons'

export default function App ({ access_token, appLayout }) {
  const [layout] = useState(appLayout)
  const [isLoggedIn, setIsLoggedIn] = useState(access_token ? true : false)
  const [loadData, setLoadData] = useState(false)

  const handleLogin = useCallback(value => setIsLoggedIn(value), [])

  const Header = () => (
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
            onClick={ () => isLoggedIn ? setLoadData(!loadData) : window.location.reload() }
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
              setIsLoggedIn(false)
            }
          }
        />
      </Box>
    </Flex>
  )

  const Footer = () => (
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
  )

  const AppContent = () => (
    <>
      <Flex width="full" justify="center">
        <Box
          p={3}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          minWidth="340px"
          maxWidth="100%"
          justifyContent="center"
        >
          { isLoggedIn ? (
            <Box textAlign="center">
              <CardList 
                loadData={ loadData } 
                appLayout={layout}/>
            </Box>
          ) : (
            <Login onLogin={ handleLogin }/>
          )}
        </Box>
      </Flex>
    </>
  )

  const Full = () => (
    <>
      <Header/>
        <AppContent/>
      <Footer/>
    </>
  )

  return (
    layout === 'full' ? <Full/> : <AppContent/>
  ) 
}
