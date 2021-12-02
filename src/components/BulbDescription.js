import React, {useState} from 'react'

import { 
    Editable,
    EditableInput,
    EditablePreview,
    Heading,
    Flex,
    Text,
    Box,
    useToast,
    Badge
} from "@chakra-ui/react"

import {changeLampName} from '../utils/Api'

export default function BulbDescription ({ bulbID, bulbIP, bulbName, bulbModel, bulbIsOnline, onChangeBulbName }){
    const [id, ] = useState(bulbID)
    const [ip, ] = useState(bulbIP)
    const [name, setName] = useState(bulbName)
    const [newName, setNewName] = useState(bulbName)
    const [model, ] = useState(bulbModel)
    const [isOnline, ] = useState(bulbIsOnline)
    const toast = useToast()
    
    const handleNameChange = async () => {
        const currentName = name
        const changedName = newName
        
        try {
            if (changedName !== currentName) {
                await changeLampName(id, changedName)
                setName(changedName)
                onChangeBulbName(changedName)
            }
        } catch (error) {
            toast({
                title: "Something went wrong!",
                description: error.message,
                status: "error",
                duration: 1500,
                isClosable: true,
            })
            setNewName(currentName)
            console.log(error)
        }
    }

    return (<>
        <Box width="100%" textAlign="right" ml="1" color="gray.600" fontSize="sm" pb="15px" onClick={ null }>
            <Text verticalAlign="text-top" fontSize="xs"><strong>{ isOnline ? ip : 'Offline' }</strong></Text>
        </Box>
        <Flex textAlign="left" verticalAlign="center">
            <Heading>
                <Editable
                    minWidth="150px"
                    maxWidth="30%"
                    value={ newName } 
                    defaultValue={ newName }
                    selectAllOnFocus={true}
                    onSubmit={ handleNameChange }
                    onChange={eventValue => setNewName(eventValue)}
                    isTruncated
                    isDisabled={ isOnline ? false : true }>
                    <EditablePreview />
                    <EditableInput />
                </Editable>
            </Heading>
        </Flex>
        <Box textAlign="right" width="90%">
        <Badge verticalAlign="top" colorScheme="yellow">
            {model}
        </Badge>
        </Box>
    </>)
}