import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Container } from '../../components/common/Container';
import SimpleHeader from '../../components/common/SimpleHeader';
import ImageCard from '../../components/home-events/ImageCard';
import BusinessHomeInitial from '../../components/home-events/BusinessHomeInitial';

const BusinessHome = () => {
    const [events, setEvents] = useState([1])
    return(
        <Container>
            <SimpleHeader
                heading="Welcome, David Martin"
                icon1={"settings"}
                icon1Press={()=>alert('settings')}
            />
            {events.length > 0
                ? 
                <>
                    <Text>asd</Text>
                </>                 
                : 
                <BusinessHomeInitial/>
            }
        </Container>
    )
}
export default BusinessHome;