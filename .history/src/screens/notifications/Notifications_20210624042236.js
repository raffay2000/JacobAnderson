import React from 'react';
import {
    View,
    Text, 
    StyleSheet
} from 'react-native';
import { Container } from '../../components/common/Container';
import SimpleHeader from '../../components/common/SimpleHeader';

const notifications = [
    {
        id:1,
        text:"Sant Martin has 15% Discount available",
    },
    {
        id:2,
        text:"Rave Party near your location",
    },
    {
        id:3,
        text:"Sant Martin has 15% Discount available",
    },
    {
        id:4,
        text:"Rave Party near your location",
    },
    {
        id:5,
        text:"Sant Martin has 15% Discount available",
    },
]

const Notifications = () => {
    return(
       <Container>
            <SimpleHeader
                heading={"Notifications"}
            />
            {
                
            }
       </Container>
    )
}
export default Notifications;

const styles = StyleSheet.create({
    
})