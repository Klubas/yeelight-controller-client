import React, {useState, useCallback} from 'react'
import ColorSlider from './ColorSlider'
 
export default function TemperatureSlider ({ temperature, onChange }) {
    const [temp, setTemperature] = useState(temperature)

    const handleTemperatureChange = useCallback(value => {
        setTemperature(value)
        onChange('temp', value)
    }, [onChange]);

    return (
        <>
            <ColorSlider 
                min={1700} 
                max={6500} 
                defaultValue={ temp } 
                onChange={ (event) => handleTemperatureChange(event) } 
                label='Temperature'/>
        </>
    )
}

