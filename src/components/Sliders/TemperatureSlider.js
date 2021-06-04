import React, {useCallback} from 'react'
import ColorSlider from './ColorSlider'
 
export default function TemperatureSlider ({ temperature, onChange }) {

    const handleTemperatureChange = useCallback(value => {
        const temp = {
            temp: value
        }

        onChange('temp', temp)
    }, [onChange]);

    return (
        <>
            <ColorSlider 
                min={1700} 
                max={6500} 
                defaultValue={ temperature } 
                onChange={ (event) => handleTemperatureChange(event) } 
                label='Temperature'/>
        </>
    )
}

