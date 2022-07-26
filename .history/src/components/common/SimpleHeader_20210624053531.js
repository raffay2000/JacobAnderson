import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { black, darkGray, lightGray } from '../../assets/colors';
import { Ionicons } from '@expo/vector-icons';

const SimpleHeader = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.heading}>{props.heading}</Text>
            <View style={{flexDirection:'row'}}>
                <Ionicons
                    name={props.icon1}
                    size={22}
                    color={darkGray}
                    onPress={()=>alert('share')}
                    style={{marginLeft:hp('1%')}}
                />
                <Ionicons
                    name={props.icon2}
                    size={22}
                    color={'red'}
                    onPress={()=>alert('heart')}
                    style={{marginLeft:hp('1%')}}
                />
            </View>
        </View>
    )
}

export default SimpleHeader;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:hp('2%')
    },
    heading:{
        fontSize:hp('3%'),
        fontFamily:"Bold",
        color:lightGray
    }
})