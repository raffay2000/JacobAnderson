import React from 'react';
import {
    View, 
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { lightGray, primary } from '../../assets/colors';
import { useTheme } from '../../theme/ThemeContext';

const MessageThread = ({id, img, name, read, readBy, msg, lastMessageBy, time, onPress}) => {
    const {colors} = useTheme();
    return(
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                {/* <Image style={styles.image} source={{uri: img}}/> */}
                <View style={styles.column}>
                    <Text style={[styles.name,{color:colors.heading}]}>{name}</Text>
                    <Text style={[styles.msg,{color:colors.text}]}>{msg}</Text>
                </View>
                <View style={styles.unreadIcon}/>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default MessageThread;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderTopWidth:1,
        borderTopColor:lightGray,
        padding:hp('1.5%'),
    },
    image:{
        flex:1,
        height:hp('8%'),
        width:hp('7%'),
        borderRadius:hp('1%')
    },
    column:{
        flex:4,
        justifyContent:'space-evenly',
        marginLeft:hp('1.5%')
    },
    name:{
        fontFamily:"Bold",
        fontSize:hp('2.25%'),
        color:primary,
    },
    msg:{
        fontFamily:"Regular",
        fontSize:hp('2%'),
    },
    unreadIcon:{
        alignSelf:'center',
        height:hp('1.5%'),
        width:hp('1.5%'),
        borderRadius:100,
        backgroundColor:primary
    }
})