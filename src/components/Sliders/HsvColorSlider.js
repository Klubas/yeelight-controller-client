import React, {useCallback} from 'react'
import ColorSlider from './ColorSlider'
 
export default function HsvColorSlider ({ hsv, onChange }) {

    const handleHueChange = useCallback(hue => {
        const color = {
            h: hue,
            s: hsv.s,
            v: hsv.v
        }

        onChange('hsv', color)
    }, [hsv, onChange]);

    const handleSatChange = useCallback(saturation => {
        const color = {
            h: hsv.h,
            s: saturation,
            v: hsv.v
        }

        onChange('hsv', color)
    }, [hsv, onChange]);

    const handleValueChange = useCallback(value => {
        const color = {
            h: hsv.h,
            s: hsv.s,
            v: value
        }

        onChange('hsv', color)
    }, [hsv, onChange]);

    return (
        <>
            <ColorSlider min={1} max={360} defaultValue={hsv.h} onChange={ (event) => handleHueChange(event) } label='Hue' />
            <ColorSlider min={40} max={100} defaultValue={hsv.s} onChange={ (event) => handleSatChange(event) } label='Saturation'/>
            <ColorSlider min={20} max={100} defaultValue={hsv.v} onChange={ (event) => handleValueChange(event) } label='Value'/>
        </>
    )
}

