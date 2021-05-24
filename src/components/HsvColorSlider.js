import React, {useState, useCallback} from 'react'
import ColorSlider from './ColorSlider'
 
export default function HsvColorSlider ({ h, s, v, onChange }) {
    const [hue, setHue] = useState(h)
    const [sat, setSaturation] = useState(s)
    const [val, setValue] = useState(v)

    const handleHueChange = useCallback(value => {
        setHue(value)
        onChange(value, sat, val)
    }, [sat, val, onChange]);

    const handleSatChange = useCallback(value => {
        setSaturation(value)
        onChange(hue, value, val)
    }, [hue, val, onChange]);

    const handleValueChange = useCallback(value => {
        setValue(value)
        onChange(hue, sat, value)
    }, [hue, sat, onChange]);

    return (
        <>
            <ColorSlider min={1} max={360} defaultValue={hue} onChange={ (event)=>  handleHueChange(event) }/>
            <ColorSlider min={1} max={100} defaultValue={sat} onChange={(event) =>  handleSatChange(event) }/>
            <ColorSlider min={1} max={100} defaultValue={val} onChange={ (event)=>  handleValueChange(event) }/>
        </>
    )
}

