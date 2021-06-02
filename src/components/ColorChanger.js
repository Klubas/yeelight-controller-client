import React, {useState} from 'react'

import { 
    Box,
    useToast
} from "@chakra-ui/react"

import HsvColorSlider from './Sliders/HsvColorSlider'
import RgbColorSlider from './Sliders/RgbColorSlider'
import TemperatureSlider from './Sliders/TemperatureSlider'
import BrightnessSlider from './Sliders/BrightnessSlider'

import {changeLampColor} from '../utils/Api'

export default function ColorChanger ({ bulbIP, bulbHSV, bulbRGB, bulbCt, bulbBrightness, onChange }) {
    const [ip, ] = useState(bulbIP)
    const [hsv, ] = useState(bulbHSV)
    const [rgb, ] = useState(bulbRGB)
    const [temperature, ] = useState(bulbCt)
    const [brightness, ] = useState(bulbBrightness)
    const toast = useToast()

    const handleColorChange = async (mode, values) => {
        
        try{
            await changeLampColor(ip, mode, values)
            onChange(mode, values)
            window.localStorage.setItem('color_mode', mode)
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
    };

    return(
        <Box width="100%" height="100%">
            <TemperatureSlider 
                temperature={ temperature } 
                onChange={ handleColorChange }
            />
            <BrightnessSlider 
                brightness={ brightness } 
                onChange={ handleColorChange }
            />
        </Box>
    )
}