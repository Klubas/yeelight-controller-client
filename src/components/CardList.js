import React, { useState, useEffect, useCallback } from 'react'

import { 
    Box, 
    Grid,
    Skeleton,
    useToast
} from "@chakra-ui/react"

import Card from '../components/Card'
import ErrorMessage from '../components/ErrorMessage'

import { getAllBulbs } from '../utils/Api'
import { getWindowDimensions } from '../utils/scripts'

export default function CardList ({ loadData, appLayout }) {
    const [cardData, setCardData] = useState([])
    const [skelCount, setSkelCount] = useState(1)
    const [error, setError] = useState('')
    const [layout] = useState(appLayout)
    const dimensions = getWindowDimensions()
    const cardHeight = (layout === 'minimal' ? dimensions.height - 30 : "190px")
    const cardWidth = (layout === 'minimal' ? dimensions.width - 30 : "330px")
    const toast = useToast()

    const fetchData = useCallback(async () => {
            
        try {
            let response = await getAllBulbs()
            response = response.response
            if (response.length > 0) {
                setSkelCount(response.length)
                setError('')
                setCardData(response)
            } else {
                throw new Error('No bulbs found!')
            }

        } catch (error) {
            toast({
                title: "Something went wrong!",
                description: error.message,
                status: "error",
                duration: 1500,
                isClosable: true,
            })
            console.log(error)
            setError(error.message)
            setSkelCount()
            setCardData([])
        }
    }, [toast])

    useEffect(() => {
        fetchData()
    }, [toast, fetchData])

    const LoadError = () => (
        <Box 
            borderRadius={8}
            minWidth={cardWidth}
            maxWidth={cardWidth}
            minHeight={cardHeight}
            maxHeight={cardHeight}
        >
            <ErrorMessage message={error}/>
        </Box>
    )

    const Loading = () => {
        let skels = []
        for(let skel = 1; skel <= skelCount; skel++) skels.push(skel)
        return (<>
            {skels.map((i) =>
                <Box key={i} maxWidth="100%">
                    <Skeleton 
                        isLoaded={ false }
                        borderRadius={8}
                        maxWidth={cardWidth}
                        minWidth={cardWidth}
                        minHeight={cardHeight}
                        maxHeight={cardHeight}
                    />
                </Box>
            )}
        </>)
    }
            
    const Bulbs = () => (<>
        { cardData.length ? cardData.map((item) => 
            <Box key={item.id} maxWidth="100%">
                <Card 
                    bulbID={item.id}
                    bulbIP={item.ip} 
                    bulbName={item.name}
                    bulbModel={item.model}
                    bulbPower={item.properties.power}
                    bulbColors={{
                        rgb: { 
                            r: Math.floor(item.properties.rgb / (256*256)),
                            g: Math.floor(item.properties.rgb / 256) % 256,
                            b: item.properties.rgb % 256 
                        }, // convert decimal color to rgb values
                        hsv: {
                            h: item.properties.hue,
                            s: item.properties.sat,
                            v: item.properties.bright
                        },
                        bright: item.properties.current_brightness,
                        temp: item.properties.ct
                    }}
                    cardHeight={cardHeight}
                    cardWidth={cardWidth}
                />
            </Box>
        ) : <Loading/>
        }
    </>)

    return (<>
        <Grid gap="6">
            { ! error ? <Bulbs/> : <LoadError/> }
        </Grid>
    </>)
}
