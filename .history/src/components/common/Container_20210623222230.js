import React from 'react';
import {
    View,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { white } from '../../assets/colors';

export const Container = (props) => {
    return(
        <View style={{backgroundColor:white, padding:hp('2.5%'), paddingTop:hp('5%')}}>
            {props.children}
        </View>
    )
}