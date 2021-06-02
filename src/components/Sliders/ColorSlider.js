import React from 'react'

import { 
    Box, 
    Text,
    Slider,
    SliderFilledTrack,
    SliderTrack,
    SliderThumb
} from "@chakra-ui/react"

export default function ColorSlider ({min, max, defaultValue, onChange, label}) {

    return(
        <Box textAlign="left">
            <Text fontSize="lg">{ label }&nbsp;&nbsp;</Text>
            <Slider 
                aria-label={label}
                defaultValue={ defaultValue }  
                min={ min }
                max={ max }
                onChangeEnd={ onChange } 
            >
                <SliderTrack>
                    <SliderFilledTrack  />
                </SliderTrack>
                <SliderThumb>
                    <Box />
                </SliderThumb>
            </Slider>
        </Box>
    )
}

