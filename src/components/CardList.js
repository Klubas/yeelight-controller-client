import React, { useState, useEffect } from 'react'
import { 
    Flex, 
    Box, 
    Grid,
    List, 
    ListItem, 
    Skeleton,
} from "@chakra-ui/core"

import Card from '../components/Card'
import {api} from '../utils/Api'

import ErrorMessage from './ErrorMessage'


export default function CardList ({data}) {
    const [cardData, setCardData] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {fetchData()}, [])

    async function fetchData() {
            
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
                        minWidth="350px"
                        maxWidth="350px"
                        minHeight="190px"
                        maxHeight="190px"
                    >
                        <ErrorMessage message={error}/> 
                    </Box>
                </>) : (<>
                    <Box>
                        <Skeleton isLoaded={false}
                            borderRadius={8}
                            minWidth="350px"
                            maxWidth="350px"
                            minHeight="190px"
                            maxHeight="190px" 
                        />
                    </Box>
                </>)    
        )
    }

    const Bulbs = () => {
        return (
            <Flex>
                <Grid gap="6">
                {cardData.map((item) => 
                    <Box key={item.id} >
                        <Card 
                            bulbId={item.id}
                            bulbIP={item.ip} 
                            bulbName={item.name}
                            bulbModel={item.model}
                            bulbPower={item.properties.power}
                            bulbColor={item.properties.rgb}
                        />
                    </Box>
                )}
                </Grid>
            </Flex>
        )
    }

    return (<>
        {! cardData.length 
            ? ( <Loading/> )
            : ( <Bulbs/>)
        }
    </>)
}
