import React, {useState} from 'react'
import bulb_on from '../images/bulb_on.svg'
import bulb_off from '../images/bulb_off.svg'
import {api} from '../utils/Api'

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
    IconButton,
    useToast, Skeleton
} from "@chakra-ui/core"


export default function Card ({ bulbId, bulbIP, bulbName, bulbModel, bulbPower, bulbColor, cardWidth, cardHeight}) {
    const toast = useToast()
    const [id, setId] = useState(bulbId)
    const [ip, setIP] = useState(bulbIP)
    const [name, setName] = useState(bulbName)
    const [model, setModel] = useState(bulbModel)
    const [power, setPower] = useState(bulbPower === 'on' ? true : false)
    const [color, setColor] = useState(bulbColor)
    const [icon, setIcon] = useState(bulbPower === 'on' ? bulb_on : bulb_off)
    const [isLoading, setIsLoading] = useState(false)
    const [newName, setNewName] = useState(bulbName)

    function toastError(errorMessage){
        toast({
            title: "An error occurred",
            description: errorMessage,
            status: "error",
            duration: 1500,
            isClosable: true,
        })
    }

    async function fetchData() {

        setIsLoading(true)
            
        try {
            let response = await api.getBulb(ip)
            response = response.response
            setId(response.id)
            setIP(response.ip)
            setName(response.name)
            setModel(response.model)
            setPower(response.properties.power)
            setColor(response.properties.rgb)
            setIcon(response.properties.power === 'on' ? bulb_on : bulb_off)
            setNewName(response.name)
            setIsLoading(false)

        } catch (error) {
            toastError(error.message)
            setIsLoading(false)
            console.log(error)
        }
    }
    
    const handleBulbClick = () => {
        const togglePower = async (state) => {
            try {
                await api.changeLampState(ip, state)
                setPower(state === 'on' ? true : false)
                setIcon(state === 'on' ? bulb_on : bulb_off)
            }
            catch (error){
                setPower(power === 'on' ? true : false)
                setIcon(power === 'on' ? bulb_on : bulb_off)
                toastError(error.message)
                console.log(error)
            }
        }
        power ? togglePower('off') : togglePower('on')
    }

    const handleSubmit = async (event) => {
        const currentName = name
        const changedName = newName
        try {
            if (changedName !== currentName) {
                await api.changeLampName(ip, changedName)
                setName(changedName)
                document.getElementById("root").focus()
            }
        } catch (error) {
            toastError(error.message)
            setNewName(currentName)
            console.log(error)
        }
      }

    return (
        <Skeleton isLoaded={!isLoading} borderRadius={8}>
        <Flex 
            align="left" 
            p={5}
            minWidth={cardWidth}
            maxWidth={cardWidth}
            minHeight={cardHeight}
            maxHeight={cardHeight}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
        >
            <Box width="full" alignContent="center">
                <Image src={icon} alt="bulb_icon" onClick={ handleBulbClick } />
            </Box>
            <Box width="full">
                <Box width="100%" textAlign="right" ml="1" color="gray.600" fontSize="sm" pb="15px">
                        <Text verticalAlign="text-top" fontSize="xs"> {ip} 
                            <IconButton 
                                icon="repeat" 
                                variant="link" 
                                verticalAlign="baseline" 
                                size="xs"
                                pb="2px"
                                onClick={ fetchData }
                            />
                        </Text>
                        
                </Box>
                <Box>
                    <Flex textAlign="left" verticalAlign="center">
                        <Heading>
                            <Editable
                                minWidth="150px"
                                maxWidth="200px"
                                value={ newName } 
                                defaultValue={ newName }
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
                        <Badge verticalAlign="top" variantColor="yellow">{model}</Badge>
                    </Box>
                </Box>
                <Box height="full" width="full" pt="30px" pl="50px">
                    <Text as="sub" fontSize="xs" color="gray.200">{ id }</Text>
                </Box>
            </Box>
        </Flex>
        </Skeleton>
    )       
}
