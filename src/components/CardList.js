import React, { useState, useEffect } from 'react'
import { Flex, Box, CircularProgress } from "@chakra-ui/core";

import Card from '../components/Card'
import {api} from '../utils/Api'

import bulb_on from '../images/bulb_on.svg'
import bulb_off from '../images/bulb_off.svg'

import ErrorMessage from './ErrorMessage';


export default function CardList ({data}) {
    const [cardData, setCardData] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            
            setIsLoading(true)

            try {
                const response = await api.getAllBulbs()
                setCardData(response.response)
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(error.message)
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return ! cardData.length ? (
        <> {
            error 
                ? <ErrorMessage message={error}/> 
                : <CircularProgress isIndeterminate color="yellow"/>
        } </>
    ) : (
        <ul>
        {cardData.map(
            (item) => 
            <li key={item.id} >
                <Flex>
                    <Box>
                        <Card 
                            bulbId={item.id}
                            bulbIP={item.ip} 
                            bulbName={item.name}
                            bulbNodel={item.model}
                            bulbPower={item.properties.power}
                            bulbColor={item.properties.rgb}
                        />
                    </Box>
                </Flex>
            </li>
        )}
        </ul>
    )
}
