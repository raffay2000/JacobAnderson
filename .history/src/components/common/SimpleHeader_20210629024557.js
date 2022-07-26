import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { black, lightGray } from '../../assets/colors';
import { Ionicons } from '@expo/vector-icons';

const SimpleHeader = (props) => {
    const navigation = useNavigation();
    const len = props.heading.length;
    return(
        <View style={styles.container}>
            <Ionicons
                name={'arrow-back'}
                size={22}
                color={black}
                onPress={()=>navigation.goBack()}
                // style={{marginLeft:hp('1%')}}
            /> 
            <Text style={styles.heading}>{len > 22 ? props.heading.splice(0,22)+"..." : props.heading}</Text>
            {props.icon1
                &&
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Ionicons
                        name={props.icon1}
                        size={22}
                        color={black}
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
            }
            
        </View>
    )
}

export default SimpleHeader;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:hp('2%'),
        marginBottom:hp('1.5%')
    },
    heading:{
        fontSize:hp('3%'),
        fontFamily:"Bold",
        color:lightGray
    }
})