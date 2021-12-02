import React, { useState } from 'react'

import { 
    Box, 
    useToast, 
    LightMode
} from "@chakra-ui/react"

import { changeLampState } from '../utils/Api'

export default function Bulb ({ bulbID, bulbPower, bulbHexColor, bulbIsOnline, onChangeBulbState }) {
    const [id, ] = useState(bulbID)
    const [power, setPower] = useState(bulbPower)
    const [isOnline, ] = useState(bulbIsOnline)
    const toast = useToast()

    const handleBulbClick = () => {
        const togglePower = async (state) => {
            try {
                await changeLampState(id, state)
                setPower(state === 'on' ? true : false)
            }
            catch (error){
                setPower(power === 'on' ? true : false)
                toast({
                    title: "Something went wrong!",
                    description: error.message,
                    status: "error",
                    duration: 1500,
                    isClosable: true,
                })
                console.log(error)
            }
        }
        power ? togglePower('off') : togglePower('on')
        onChangeBulbState(power)
    }

    const BulbIcon = () => (
        <svg width="76" height="117" viewBox="0 0 76 117" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#455A64" d="M48.1812 95.113H28.2667C26.8919 95.113 25.7773 96.2276 25.7773 97.6024C25.7773 98.9772 26.8919 100.092 28.2667 100.092H48.1812C49.556 100.092 50.6706 98.9772 50.6706 97.6024C50.6703 96.2276 49.556 95.113 48.1812 95.113Z" />
            <path fill="#455A64" d="M48.3723 103.277H28.4579C27.0831 103.277 25.9685 104.391 25.9685 105.766C25.9685 107.141 27.0831 108.256 28.4579 108.256H48.3723C49.7471 108.256 50.8617 107.141 50.8617 105.766C50.8617 104.391 49.7471 103.277 48.3723 103.277Z"/>
            <path fill="#455A64" d="M43.1953 111.641H33.2379C31.8631 111.641 30.7485 112.756 30.7485 114.131C30.7485 115.506 31.8631 116.62 33.2379 116.62H43.1953C44.5701 116.62 45.6847 115.506 45.6847 114.131C45.6847 112.756 44.5701 111.641 43.1953 111.641Z" />
            <path fill={ power ? bulbHexColor : "#d6d6d6" } fillOpacity="80.0" d="M64.4163 11.2431C57.3217 4.16277 47.6421 0.288775 37.6215 0.519115C17.0207 0.827167 0.570472 17.7768 0.878524 38.3774C1.03862 49.0818 5.78963 59.2013 13.9232 66.1621C14.3514 66.5094 14.6483 66.9922 14.7645 67.5313C16.0191 74.2973 18.9514 90.1342 28.2665 90.1342H48.181C57.511 90.1342 60.543 73.7048 61.6879 67.5213C61.799 66.9883 62.093 66.5108 62.5194 66.1722C78.1669 52.7819 79.9967 29.2422 66.6065 13.5948C65.9103 12.7815 65.1796 11.9983 64.4163 11.2478V11.2431Z"/>
        </svg>
    )
    
    return (
        <LightMode>
            <Box width="45%" alignContent="right" size="80%" maxWidth="80%" 
                onClick={ isOnline ? null : handleBulbClick }>
                <BulbIcon/>
            </Box>
        </LightMode>
    )
}
