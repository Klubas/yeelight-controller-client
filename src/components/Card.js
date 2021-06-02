import React, {useState} from 'react'

import { 
    Box, 
    Flex, 
    Skeleton,
} from "@chakra-ui/react"

import Bulb from './Bulb'
import ColorChanger from './ColorChanger'
import BulbDescription from './BulbDescription'

import { kelvinToHex, colorToHex } from '../utils/scripts'

export default function Card ({ 
        bulbIP
        , bulbName
        , bulbModel
        , bulbPower
        , bulbColors
        , cardWidth
        , cardHeight
}){
    const [ip, ] = useState(bulbIP)
    const [name, ] = useState(bulbName)
    const [model, ] = useState(bulbModel)
    const [power, ] = useState(bulbPower === 'on' ? true : false)
    const [colorPicker, setColorPicker] = useState(false)
    const [isLoading, ] = useState(false)
    const [, setHexColor] = useState()
    const [colors, setColors] = useState(() => getBulbColors())

    function getBulbColors(){
        
        const hexColor = () => {
            let color_mode = window.localStorage.getItem('color_mode')
            if (color_mode === 'rgb')    { return(colorToHex(bulbColors.rgb))   }
            if (color_mode === 'hsv')    { return(colorToHex(bulbColors.hsv))   }
            if (color_mode === 'bright') { return(colorToHex(bulbColors.hsv))   }
            if (color_mode === 'temp')   { return(kelvinToHex(bulbColors.temp)) }
            return(colorToHex(bulbColors.rgb))
        }

        let obj = bulbColors
        obj.hex = hexColor()
        return obj
    }

    function setBulbColors (color_mode, values) {
        let obj = colors
        if (color_mode === 'rgb') {
            obj.rgb = values
            obj.hex = colorToHex(obj.rgb)
        }

        if (color_mode === 'hsv') {
            obj.hsv = values
            obj.bright = values.v
            obj.hex = colorToHex(obj.hsv)
        }

        if (color_mode === 'bright') {
            obj.hsv.v = values
            obj.bright = values
            obj.hex = colorToHex(obj.hsv)
        }

        if (color_mode === 'temp') {
            obj.temp = values
            obj.hex = kelvinToHex(obj.temp)
        }
        setHexColor(obj.hex) // This doesn't make sense, but without it the props bulbHexColor won't update until the next render
        setColors(obj)
    }

    const BulbColorChanger = () => (
        <Box width="full" onDoubleClick={() => setColorPicker(false) }>
            <ColorChanger 
                bulbIP={ ip } 
                bulbHSV = { colors.hsv } 
                bulbCt={ colors.temp } 
                bulbRGB={ colors.rgb }
                bulbBrightness = { colors.bright }
                onChange={ setBulbColors }
            />
        </Box>
    )
    
    const BulbMetaData = () => (<>
        <Box width="full" onDoubleClick={() => setColorPicker(true) }>
            <BulbDescription bulbIP={ ip } bulbName={ name } bulbModel={ model }/>
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
            <Bulb bulbIP={ip} bulbPower={ power } bulbHexColor={ colors.hex }/>
        </Box>
            { colorPicker ? <BulbColorChanger/> : <BulbMetaData/>}
        </Flex>
        </Skeleton>
    )       
}
