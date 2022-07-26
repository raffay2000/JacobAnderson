import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Container } from '../../components/common/Container';
import SimpleHeader from '../../components/common/SimpleHeader';
import ImageCard from '../../components/home-events/ImageCard';
import BusinessHomeInitial from '../../components/home-events/BusinessHomeInitial';

const BusinessHome = () => {
    const [events, setEvents] = useState([1]);
    const onCardPress = () => {
        alert('press')
    }
    return(
        <Container>
            <SimpleHeader
                heading="Welcome, David Martin"
                icon1={"settings"}
                icon1Press={()=>alert('settings')}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
            {events.length > 0
                ? 
                <>
                    <ImageCard
                        image={require('../../assets/images/food.png')}
                        title={"Sant Martin Restaurant"}
                        desc={"Chicken wings, Chicken BBQ...."}
                        loc={"14th Street, NewYork, USA"}
                        discount={"Discount - 70% Off"}
                        onPress={onCardPress}
                    />
                    <ImageCard
                        image={require('../../assets/images/party.png')}
                        title={"Sant Martin Restaurant"}
                        desc={"Chicken wings, Chicken BBQ...."}
                        loc={"14th Street, NewYork, USA"}
                        discount={"Discount - 70% Off"}
                        onPress={onCardPress}
                    />
                    <ImageCard
                        image={require('../../assets/images/food.png')}
                        title={"Sant Martin Restaurant"}
                        desc={"Chicken wings, Chicken BBQ...."}
                        loc={"14th Street, NewYork, USA"}
                        onPress={onCardPress}
                    />
                    <ImageCard
                        image={require('../../assets/images/party.png')}
                        title={"Sant Martin Restaurant"}
                        desc={"Chicken wings, Chicken BBQ...."}
                        loc={"14th Street, NewYork, USA"}
                        onPress={onCardPress}
                    />
                </>                 
                : 
                <BusinessHomeInitial/>
            }
            </ScrollView>
        </Container>
    )
}
export default BusinessHome;