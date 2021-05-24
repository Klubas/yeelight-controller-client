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
  useToast
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import {api} from '../utils/Api'
import CardList from './CardList'
import ErrorMessage from './ErrorMessage'

export default function Login({ access_token, appLayout }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(access_token ? true : false)
  const [showPassword, setShowPassword] = useState(false)
  const [layout, setLayout] = useState(appLayout)
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

  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  return (
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
        {isLoggedIn ? (
          <Box textAlign="center">
              <CardList appLayout={layout}/>
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
                        {showPassword ? (<ViewOffIcon/>) : (<ViewIcon/>)}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  colorScheme="yellow"
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
