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

export default function ColorChanger ({ colorMode, bulbID, bulbHSV, bulbRGB, bulbCt, bulbBrightness, onChange }) {
    const [id, ] = useState(bulbID)
    const [hsv, ] = useState(bulbHSV)
    const [rgb, ] = useState(bulbRGB)
    const [temperature, ] = useState(bulbCt)
    const [brightness, ] = useState(bulbBrightness)
    const [mode, ] = useState(colorMode)
    const toast = useToast()

    const handleColorChange = async (mode, values) => {
        
        try{
            await changeLampColor(id, mode, Object.values(values))
            onChange(mode, values)
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

    const RGBMode = () => (
        <RgbColorSlider
            rgb={ rgb }
            onChange={ handleColorChange }
        />
    )

    const HSVMode = () => (
        <HsvColorSlider
            hsv={ hsv }
            onChange={ handleColorChange }
        />
    )

    const BrightMode = () => (
        <BrightnessSlider
            brightness={ brightness } 
            onChange={ handleColorChange }
        />
    )

    const TempMode = () => (
        <TemperatureSlider
            temperature={ temperature } 
            onChange={ handleColorChange }
        />
    )

    const SliderMode = () => {
        switch(mode){
            case 'rgb': return RGBMode(); 
            case 'hsv': return HSVMode(); 
            case 'bright': return BrightMode(); 
            case 'temp': return TempMode(); 
            default: return 'Color mode ' + mode + ':('; 
        }
    }

    return(
        <Box width="full" height="full" >
            <SliderMode/>
        </Box>
    )
}