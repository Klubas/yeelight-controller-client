import React, {useCallback} from 'react'
import ColorSlider from './ColorSlider'
 
export default function BrightnessSlider ({ brightness, onChange }) {

    const handleValueChange = useCallback(value => {
        const bright = {
            bright: value
        }
        
        onChange('bright', bright)
    }, [onChange]);

    return (
        <ColorSlider 
            min={1} 
            max={100} 
            defaultValue={ brightness } 
            onChange={ (event) => handleValueChange(event) } 
            label='Brightness'
        />
    )
}

