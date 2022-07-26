import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useTheme } from '@react-navigation/native';
import { lightGray } from '../../assets/colors';
import { Ionicons } from '@expo/vector-icons';


const SimpleHeader = (props) => {
    const navigation = useNavigation();
    const {colors} = useTheme();
    const len = props.heading.length;
    return(
        <View style={styles.container}>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                {props.backIcon
                    &&
                    <Ionicons
                        name={'arrow-back'}
                        size={22}
                        color={lightGray}
                        onPress={()=>navigation.goBack()}
                        style={{marginRight:hp('1%')}}
                    /> 
                }
                <Text style={[styles.heading,{color:colors.heading}]}>{len > 22 ? props.heading.slice(0,22)+"..." : props.heading}</Text>
            </View>
            {props.icon1
                &&
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Ionicons
                        name={props.icon1}
                        size={22}
                        color={lightGray}
                        onPress={()=>alert('share')}
                        style={{marginLeft:hp('1%')}}
                    />
                    <Ionicons
                        name={props.icon2}
                        size={24}
                        color={'red'}
                        onPress={()=>alert('heart')}
                        style={{marginLeft:hp('1.5%')}}
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
        alignItems:'center',
        marginTop:hp('2%'),
        marginBottom:hp('1.5%')
    },
    heading:{
        fontSize:hp('3%'),
        fontFamily:"Bold",
        color:lightGray
    }
})