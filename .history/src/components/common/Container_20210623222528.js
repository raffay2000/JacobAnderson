import React from 'react';
import {
    View,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { white } from '../../assets/colors';

export const Container = (props) => {
    return(
        <View style={{flex:1, backgroundColor:'red', padding:hp('3.5%'), paddingTop:hp('5%')}}>
            {props.children}
        </View>
    )
}