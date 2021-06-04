import React, {useCallback} from 'react'
import ColorSlider from './ColorSlider'
 
export default function RgbColorSlider ({ rgb, onChange }) {

    const handleRedChange = useCallback(red => {
        const color = {
            r: red,
            g: rgb.g,
            b: rgb.b
        }

        onChange('rgb', color)
    }, [rgb, onChange]);

    const handleGreenChange = useCallback(green => {
        const color = {
            r: rgb.r,
            g: green,
            b: rgb.b
        }

        onChange('rgb', color)
    }, [rgb, onChange]);

    const handleBlueChange = useCallback(blue => {
        const color = {
            r: rgb.r,
            g: rgb.g,
            b: blue
        }

        onChange('rgb', color)
    }, [rgb, onChange]);

    return (
        <>
            <ColorSlider min={1} max={255} defaultValue={rgb.r} onChange={ (event) => handleRedChange(event) } label='Red'/>
            <ColorSlider min={1} max={255} defaultValue={rgb.g} onChange={ (event) => handleGreenChange(event) } label='Green'/>
            <ColorSlider min={1} max={255} defaultValue={rgb.b} onChange={ (event) => handleBlueChange(event) } label='Blue'/>
        </>
    )
}

