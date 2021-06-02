import React, {useState, useCallback} from 'react'
import ColorSlider from './ColorSlider'
 
export default function HsvColorSlider ({ h, s, v, onChange }) {
    const [hue, setHue] = useState(h)
    const [sat, setSaturation] = useState(s)
    const [val, setValue] = useState(v)

    const handleHueChange = useCallback(value => {
        setHue(value)
        let values=[value, sat, val]
        onChange('hsv', values)
    }, [sat, val, onChange]);

    const handleSatChange = useCallback(value => {
        setSaturation(value)
        let values=[hue, value, val]
        onChange('hsv', values)
    }, [hue, val, onChange]);

    const handleValueChange = useCallback(value => {
        setValue(value)
        let values=[hue, sat, value]
        onChange('hsv', values)
    }, [hue, sat, onChange]);

    return (
        <>
            <ColorSlider min={1} max={360} defaultValue={hue} onChange={ (event) => handleHueChange(event) } label='Hue' />
            <ColorSlider min={40} max={100} defaultValue={sat} onChange={ (event) => handleSatChange(event) } label='Saturation'/>
            <ColorSlider min={20} max={100} defaultValue={val} onChange={ (event) => handleValueChange(event) } label='Value'/>
        </>
    )
}

