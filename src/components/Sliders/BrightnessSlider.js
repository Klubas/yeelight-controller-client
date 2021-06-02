import React, {useState, useCallback} from 'react'
import ColorSlider from './ColorSlider'
 
export default function BrightnessSlider ({ brightness, onChange }) {
    const [bright, setValue] = useState(brightness)

    const handleValueChange = useCallback(value => {
        setValue(value)
        onChange('bright', value)
    }, [onChange]);

    return (
        <ColorSlider 
            min={1} 
            max={100} 
            defaultValue={ bright } 
            onChange={ (event) => handleValueChange(event) } 
            label='Brightness'
        />
    )
}

