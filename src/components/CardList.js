import React, { useState, useEffect } from 'react'
import { 
    Box, 
    Grid,
    Skeleton,
} from "@chakra-ui/core"

import Card from '../components/Card'
import {api} from '../utils/Api'
import ErrorMessage from './ErrorMessage'

export default function CardList () {
    const [cardData, setCardData] = useState([])
    const [error, setError] = useState('')
    const cardHeight = "190px"
    const cardWidth = "330px"

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {

        try {
            let response = await api.getAllBulbs()
            response = response.response
            if (response.length > 0) {
                setCardData(response)
                setError('')
            } else {
                throw new Error('No bulbs found!')
            }
        } catch (error) {
            setError(error.message)
            console.log(error)
        }
    }

    const Loading = () => {
        return (
            error 
                ? (<>
                    <Box 
                        borderRadius={8}
                        minWidth={cardWidth}
                        maxWidth={cardWidth}
                        minHeight={cardHeight}
                        maxHeight={cardHeight}
                    >
                        <ErrorMessage message={error}/> 
                    </Box>
                </>) : (<>
                    <Grid gap="6">
                        <Skeleton isLoaded={false}
                            borderRadius={8}
                            maxWidth={cardWidth}
                            minWidth={cardWidth}
                            minHeight={cardHeight}
                            maxHeight={cardHeight}
                        />
                        <Skeleton isLoaded={false}
                            borderRadius={8}
                            maxWidth={cardWidth}
                            minWidth={cardWidth}
                            minHeight={cardHeight}
                            maxHeight={cardHeight}
                        />
                    </Grid>
                </>)    
        )
    }

    const Bulbs = () => {
        return (
                <Grid gap="6">
                {cardData.map((item) => 
                    <Box key={item.id} maxWidth="100%">
                        <Card 
                            bulbId={item.id}
                            bulbIP={item.ip} 
                            bulbName={item.name}
                            bulbModel={item.model}
                            bulbPower={item.properties.power}
                            bulbColor={item.properties.rgb}
                            cardHeight={cardHeight}
                            cardWidth={cardWidth}
                        />
                    </Box>
                )}
                </Grid>
        )
    }

    return (<>
        { ! cardData.length
            ? ( <Loading/> )
            : ( <Bulbs/>)
        }
    </>)
}
