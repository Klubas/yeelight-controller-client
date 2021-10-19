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
                size="lg"
            >
                <SliderTrack>
                    <SliderFilledTrack color="red" />
                </SliderTrack>
                <SliderThumb/>
            </Slider>
        </Box>
    )
}

