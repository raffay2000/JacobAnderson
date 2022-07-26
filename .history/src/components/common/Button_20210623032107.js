import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Button = ({onPress, color, text}) => {
    return(
        <TouchableOpacity onPress={onPress} style={[styles.container,{backgroundColor:color}]}>
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'80%',
        height:hp('5.5%'),
        marginTop:hp('2.5%')
    },
    text:{

    }
})