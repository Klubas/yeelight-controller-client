import React, {useState, useCallback} from 'react'
import bulb_on from '../images/bulb_on.svg'
import bulb_off from '../images/bulb_off.svg'
import HsvColorSlider from './HsvColorSlider'
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
    useToast, 
    Skeleton,
} from "@chakra-ui/react"
import { RepeatIcon } from '@chakra-ui/icons'

export default function Card ({ bulbId, bulbIP, bulbName, bulbModel, bulbPower, bulbRGB, bulbHSV, cardWidth, cardHeight, appLayout}) {
    const toast = useToast()
    const [id, setId] = useState(bulbId)
    const [ip, setIP] = useState(bulbIP)
    const [name, setName] = useState(bulbName)
    const [model, setModel] = useState(bulbModel)
    const [power, setPower] = useState(bulbPower === 'on' ? true : false)
    const [hsv, setHSV] = useState(bulbHSV)
    const [colorPicker, setColorPicker] = useState(false)
    const [icon, setIcon] = useState(bulbPower === 'on' ? bulb_on : bulb_off)
    const [isLoading, setIsLoading] = useState(false)
    const [newName, setNewName] = useState(bulbName)
    const [layout, setLayout] = useState(appLayout)
    const iconSize = "80%"
    
    function toastError(errorMessage){
        toast({
            title: "Something went wrong!",
            description: errorMessage,
            status: "error",
            duration: 1500,
            isClosable: true,
        })
    }

    async function fetchData() {

        setIsLoading(true)
            
        try {
            let response = await api.getBulb(ip, id)
            response = response.response
            setId(response.id)
            setIP(response.ip)
            setName(response.name)
            setModel(response.model)
            setPower(response.properties.power)
            setIcon(response.properties.power === 'on' ? bulb_on : bulb_off)
            setNewName(response.name)
            setIsLoading(false)

        } catch (error) {
            toastError(error.message)
            setIsLoading(false)
            console.log(error)
        }
    }

    const handleHsvColorChange = useCallback((hue, sat, val) => {
        let color_values = [hue, sat, val]

        const handleColorChange = async (values) => {
            try{
                await api.changeHsvLampColor(ip, values)
                setHSV(values)
                //todo: atualizar cor do ícone
                document.getElementById("root").focus()
            } catch (error) {
                toast({
                    title: "Something went wrong!",
                    description: error.message,
                    status: "error",
                    duration: 1500,
                    isClosable: true,
                })
                console.log(error)
            }
        }

        handleColorChange(color_values)
        
    }, [ip, toast]);
    
    const handleBulbClick = () => {
        const togglePower = async (state) => {
            try {
                await api.changeLampState(ip, state, id)
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

    const handleNameChange = async (event) => {
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
                <Image 
                    src={icon} 
                    alt="bulb_icon" 
                    onClick={ handleBulbClick }
                    size={ iconSize }
                    maxWidth={ iconSize }
                />
            </Box>
            <Box width="full">
                { colorPicker 
                    ? <Box width="100%" height="100%">
                        <HsvColorSlider 
                            h={ hsv[0] }
                            s={ hsv[1] }
                            v={ hsv[2] }
                            onChange={ handleHsvColorChange } />
                     </Box>
                    : <>
                        <Box width="100%" textAlign="right" ml="1" color="gray.600" fontSize="sm" pb="15px" onClick={ layout === 'minimal' ? fetchData : null }>
                                <Text verticalAlign="text-top" fontSize="xs" > {ip} 
                                    <IconButton 
                                        icon={<RepeatIcon/>} 
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
                                        maxWidth={cardWidth - icon.width}
                                        value={ newName } 
                                        defaultValue={ newName }
                                        selectAllOnFocus={true}
                                        onSubmit={ handleNameChange }
                                        onChange={eventValue => setNewName(eventValue)}
                                        isTruncated
                                        isDisabled={ layout === 'minimal' ? true : false }
                                    >
                                        <EditablePreview />
                                        <EditableInput />
                                    </Editable>
                                </Heading>
                            </Flex>
                            <Box textAlign="right" width="90%">
                                <Badge 
                                    verticalAlign="top" 
                                    colorScheme="yellow" 
                                    onDoubleClick={event => setColorPicker(true) }>{model}
                                </Badge>
                            </Box>
                        </Box>   
                    </>
                }
            </Box>
        </Flex>
        </Skeleton>
    )       
}
