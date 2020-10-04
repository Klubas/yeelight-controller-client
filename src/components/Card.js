import React, {useState, useEffect} from 'react'
import bulb_on from '../images/bulb_on.svg'
import bulb_off from '../images/bulb_off.svg'
import {api} from '../utils/Api'
import ErrorMessage from './ErrorMessage';

import { 
    Image,
    Flex, 
    Box, 
    Badge,
    Text,
    Editable,
    EditableInput,
    EditablePreview,
    Heading,
    Icon
} from "@chakra-ui/core";


export default function Card ({ bulbId, bulbIP, bulbName, bulbModel, bulbPower, bulbColor }) {
    const [id, setId] = useState(bulbId)
    const [ip, setIP] = useState(bulbIP)
    const [name, setName] = useState(bulbName)
    const [model, setModel] = useState(bulbModel)
    const [power, setPower] = useState(bulbPower === 'on' ? true : false)
    const [color, setColor] = useState(bulbColor)
    const [icon, setIcon] = useState(bulbPower === 'on' ? bulb_on : bulb_off)
    const [editableName, setEditableName] = useState(false)
    const [newName, setNewName] = useState(bulbName)
    const [error, setError] = useState('')

    const handleBulbClick = () => {
        const togglePower = (state) => {
            try {
                api.changeLampState(ip, state)
                setPower(state === 'on' ? true : false)
                setIcon(state === 'on' ? bulb_on : bulb_off)
            }
            catch (error){
                console.log(error)
            }
        }
        power ? togglePower('off') : togglePower('on')
    }

    const handleSubmit = async (event) => {
        try {
            if (newName !== name) {
                await api.changeLampName(ip, newName)
                setName(newName)
            }
        } catch (error) {
            setName(name)
            setNewName(name)
            setError(error.message)
            console.log(error)
        }
      }

    return (
        <Flex 
            align="left" 
            p={5}
            minWidth="300px"
            maxWidth="300px"
            minHeight="190px"
            maxHeight="190px"
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
        >
        
            <Box width="full" alignContent="center">
                <Image src={icon} alt="bulb_icon" onClick={ handleBulbClick } />
            </Box>
            <Box width="full">
                <Box width="90%" textAlign="right" ml="2" color="gray.600" fontSize="sm" >
                    <Text verticalAlign="text-top" fontSize="xs"> {ip} </Text>
                </Box>
                <Box>
                    <Flex width="full" textAlign="left" verticalAlign="center">
                        <Heading>
                            <Editable 
                                maxWidth="170px"
                                defaultValue={ name }
                                selectAllOnFocus={true} 
                                onSubmit={ handleSubmit }
                                onChange={eventValue => setNewName(eventValue)}
                                isTruncated
                            >
                                <EditablePreview />
                                <EditableInput />
                            </Editable>
                        </Heading>
                        
                    </Flex>
                    <Box textAlign="right" width="90%">
                        <Badge verticalAlign="sub">{model}</Badge>
                    </Box>
                </Box>
                {error && <ErrorMessage message={error} />}
            </Box>
        </Flex>
    )
        
}
