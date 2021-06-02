import React, { useState} from 'react'

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  InputGroup,
  InputRightElement,
  useToast
} from '@chakra-ui/react'

import { 
  ViewIcon, 
  ViewOffIcon 
} from '@chakra-ui/icons'

import {login} from '../utils/Api'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const toast = useToast()
  
  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsLoading(true)

    try {
        await login(email, password)
        setIsLoading(false)
        setShowPassword(false)

        toast({
          title: "Welcome to YeelightHub",
          status: "success",
          duration: 1500,
          isClosable: true,
        })

        onLogin(true)
    } catch (error) {

          toast({
            title: "Ops!",
            description: error.message,
            status: "error",
            duration: 1500,
            isClosable: true,
        })

        setIsLoading(false)
        setEmail('')
        setPassword('')
        setShowPassword(false)
        onLogin(false)
    }
  }

  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <>
      <Box textAlign="left">
        <Heading>Login</Heading>
      </Box>
      <Box my={4} textAlign="left">
        <form onSubmit={handleSubmit}>
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
  )
}
