import React, { useState, useEffect } from 'react'
import { Flex, Box, CircularProgress,  List, ListItem, ListIcon} from "@chakra-ui/core";

import Card from '../components/Card'
import {api} from '../utils/Api'

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

    return ( ! cardData.length ? 
        (
            <> 
            { error 
                    ? <ErrorMessage message={error}/> 
                    : <CircularProgress
                    isIndeterminate
                    size="24px"
                    color="yellow"
                    />
            } 
            </>
        ) : (
            <Flex>
                <List as="ul">
                {cardData.map(
                    (item) => 
                    <ListItem key={item.id} >
                        <Card 
                            bulbId={item.id}
                            bulbIP={item.ip} 
                            bulbName={item.name}
                            bulbModel={item.model}
                            bulbPower={item.properties.power}
                            bulbColor={item.properties.rgb}
                        />
                    </ListItem>
                )}
            </List>
        </Flex>
    ))
}
