import React from 'react'
import { useColorMode, Box, IconButton } from '@chakra-ui/core'

export default function ThemeToggler() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
      <IconButton
        size="lg"
        icon={colorMode === 'light' ? 'moon' : 'sun'}
        onClick={toggleColorMode}
        variant="ghost"
      />
  )
}
