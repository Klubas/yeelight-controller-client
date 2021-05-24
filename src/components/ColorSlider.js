import React from 'react'

import { 
    Box, 
    Slider,
    SliderFilledTrack,
    SliderTrack,
    SliderThumb
} from "@chakra-ui/react"

export default function ColorSlider ({min, max, defaultValue, onChange}) {

    return(
        <Slider 
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
    )
}

