import ReactDOM from 'react-dom'
import React, { useState} from 'react'

import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  InputGroup,
  InputRightElement,
  Icon,
  useToast,
  IconButton
} from '@chakra-ui/core'
import ThemeToggler from '../components/ThemeToggler'

import {api} from '../utils/Api'
import CardList from './CardList'
import ErrorMessage from './ErrorMessage'

export default function Login({ access_token }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(access_token ? true : false)
  const [showPassword, setShowPassword] = useState(false)
  const toast = useToast()

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsLoading(true)

    try {
        await api.basicLogin(email, password)
        setIsLoggedIn(true)
        setIsLoading(false)
        setShowPassword(false)
        toast({
          title: "Welcome to YeelightHub",
          status: "success",
          duration: 1500,
          isClosable: true,
      })
    } catch (error) {
        setError(error.message)
        setIsLoading(false)
        setEmail('')
        setPassword('')
        setShowPassword(false)
    }
  }

  const Header = () => (
    <header className="App-header">
      <Flex width="100%" justify="center">
          <Box textAlign="center" p={5} >
            <ThemeToggler />
          </Box>
          <Box textAlign="center" p={5} >
            <IconButton 
                size="lg"
                icon="repeat" 
                variant="ghost" 
                verticalAlign="top"
                onClick={
                  () => {
                    window.location.reload()
                  }
                }
            />
          </Box>
              <Box textAlign="center" p={5} 
                    visibility={isLoggedIn ? "visible" : "hidden"}>
                <IconButton 
                  size="lg"
                  icon="small-close" 
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
    </header>
)

  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <> <Header/>
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
        {isLoggedIn ? (
          <Box textAlign="center">
              <CardList/>
          </Box>
        ) : (
          <>
            <Box textAlign="left">
              <Heading>Login</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    placeholder="test@test.com"
                    size="lg"
                    onChange={event => setEmail(event.currentTarget.value)}
                  />
                </FormControl>
                <FormControl isRequired mt={6}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="*******"
                      size="lg"
                      onChange={event => setPassword(event.currentTarget.value)}
                    />
                    <InputRightElement width="3rem">
                      <Button
                        h="1.5rem"
                        size="sm"
                        variant="ghost"
                        onClick={handlePasswordVisibility}
                      >
                        {showPassword ? (
                          <Icon name="view-off"/>
                        ) : (
                          <Icon name="view"/>
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  variantColor="yellow"
                  variant="outline"
                  type="submit"
                  width="full"
                  mt={4}
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="yellow"
                    />
                  ) : (
                    'Log In'
                  )}
                </Button>
              </form>
            </Box>
          </>
        )}
      </Box>
    </Flex>
    </>
  )
}
