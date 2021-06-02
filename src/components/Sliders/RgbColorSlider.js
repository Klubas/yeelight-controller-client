import React, {useState, useCallback} from 'react'
import ColorSlider from './ColorSlider'
 
export default function RgbColorSlider ({ r, g, b, onChange }) {
    const [red, setRed] = useState(r)
    const [green, setGreen] = useState(g)
    const [blue, setBlue] = useState(b)

    const handleRedChange = useCallback(value => {
        setRed(value)
        let values=[value, green, blue]
        onChange('rgb', values)
    }, [green, blue, onChange]);

    const handleGreenChange = useCallback(value => {
        setGreen(value)
        let values=[red, value, blue]
        onChange('rgb', values)
    }, [red, blue, onChange]);

    const handleBlueChange = useCallback(value => {
        setBlue(value)
        let values=[red, green, value]
        onChange('rgb', values)
    }, [red, green, onChange]);

    return (
        <>
            <ColorSlider min={1} max={255} defaultValue={red}   onChange={ (event) => handleRedChange(event) } label='Red'/>
            <ColorSlider min={1} max={255} defaultValue={green} onChange={ (event) => handleGreenChange(event) } label='Green'/>
            <ColorSlider min={1} max={255} defaultValue={blue}  onChange={ (event) => handleBlueChange(event) } label='Blue'/>
        </>
    )
}

