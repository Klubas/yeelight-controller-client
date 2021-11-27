import React, {useState} from 'react'

import { 
    Box, 
    Flex, 
    Skeleton,
    useToast
} from "@chakra-ui/react"

import Bulb from './Bulb'
import ColorChanger from './ColorChanger'
import BulbDescription from './BulbDescription'

import { getBulb } from '../utils/Api'
import { kelvinToHex, colorToHex, colorToHsv } from '../utils/scripts'

export default function Card ({ bulbID, bulbIP, bulbName, bulbModel, bulbPower, bulbColors, cardWidth, cardHeight}) {
    const [id, setID] = useState(bulbID)
    const [ip, setIP] = useState(bulbIP)
    const [name, setBulbName] = useState(bulbName)
    const [model, setModel] = useState(bulbModel)
    const [power, setPower] = useState(bulbPower === 'on' ? true : false)
    const [colorPicker, setColorPicker] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [hexColor, setHexColor] = useState()
    const [colors, setColors] = useState(() => getBulbColors())
    const toast = useToast()

    const fetchBulb = async () => {
        setIsLoading(true)
        try {
            let response = await getBulb(id)
            response = response.response
            if (response) {
                console.log(response)
                setID(response.id)
                setIP(response.ip)
                setBulbName(response.name)
                setModel(response.model)
                
                
            } else {
                throw new Error('No bulb data found!')
            }

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
        setIsLoading(false)

    }
  
    function getBulbColors(){
        
        const hexColor = () => {
            let color_mode = window.localStorage.getItem('color_mode')
            switch (color_mode) {
                case 'rgb': return(colorToHex(bulbColors.rgb))
                case 'hsv': return(colorToHex(bulbColors.hsv))
                case 'bright': return(colorToHex(bulbColors.hsv))
                case 'temp': return(kelvinToHex(bulbColors.temp)) 
                default: return(colorToHex(bulbColors.rgb))
            }
        }

        let obj = bulbColors
        obj.hex = hexColor()
        return obj
    }

    function setBulbColors (color_mode, values) {
        let obj = colors
        switch (color_mode) {
            case 'rgb':
                obj.rgb = values
                obj.hex = colorToHex(obj.rgb)
            break;
            case 'hsv':
                obj.hsv = values
                obj.bright = values.v
                obj.hex = colorToHex(obj.hsv)
            break;
            case 'bright':
                const aux_hsv  = colorToHsv(obj.hex)
                aux_hsv.v = values.bright
                obj.hex = colorToHex(aux_hsv)
                obj.hsv.v = values.bright
                obj.bright = values.bright
            break;
            case 'temp':
                obj.temp = values.temp
                obj.hex = kelvinToHex(obj.temp)
            break;
            default:
                throw new Error('Invalid value:' + color_mode)
        }
        setHexColor(obj.hex) // This doesn't make sense, but without it the props bulbHexColor won't update until the next render
        setColors(obj)
    }

    const BulbColorChanger = () => (
        <Box width="full" onDoubleClick={() => setColorPicker(false) }>
            <ColorChanger 
                bulbID={ id } 
                bulbCt={ colors.temp } 
                onChange={ setBulbColors }
                colorMode={ 'temp' }
            />
            <ColorChanger 
                bulbID={ id } 
                bulbBrightness={ colors.bright } 
                onChange={ setBulbColors }
                colorMode={ 'bright' }
            />
        </Box>
    )
    
    const BulbMetaData = () => (<>
        <Box width="full" onDoubleClick={
                () => setColorPicker(true)
                //() => fetchBulb(ip)
            }>
            <BulbDescription
                bulbIP={ ip } 
                bulbID={ id }
                bulbName={ name } 
                bulbModel={ model } 
                onChangeBulbName={ setBulbName }
            />
        </Box>   
    </>)
    
    return (
        <Skeleton isLoaded={!isLoading} borderRadius={8}>
        <Flex 
            align="left" 
            p={5}
            minWidth={cardWidth}
            maxWidth={cardWidth}
            minHeight={cardHeight}
            maxHeight={cardHeight}
            boxShadow="lg"
        >
        <Box width="full">
            <Bulb bulbID={id} bulbPower={ power } bulbHexColor={ colors.hex }/>
        </Box>
            { colorPicker ? <BulbColorChanger/> : <BulbMetaData/>}
        </Flex>
        </Skeleton>
    )       
}
