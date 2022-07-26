import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { primary, white } from '../../assets/colors';


const ReservationCard = ({}) => {
    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.text}>32</Text>
                <Text style={styles.subText}>Total Seats</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.text}>16</Text>
                <Text style={styles.subText}>Reserved Seats</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.text}>32</Text>
                <Text style={styles.subText}>Date</Text>
            </View>
        </View>
    )
}
export default ReservationCard;

const styles = StyleSheet.create({
    container:{
        marginTop:hp('5%'),
        marginBottom:hp('5%'),
        flexDirection:'row',
        justifyContent:'space-around',
    },
    card:{
        height:hp('10%'),
        width:hp('12.5%'),
        padding:hp('2%'),
        borderRadius:hp('1%'),
        backgroundColor:primary,
        justifyContent:'space-between',
        alignItems:'center',
    },
    text:{
        color:white,
        fontSize:hp('3%'),
        fontFamily:"Bold",
        textAlign:"right"
    },
    subText:{
        color:white,
        fontSize:hp('1.8%'),
        fontFamily:"Regular"
    }
})