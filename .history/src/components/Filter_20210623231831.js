import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { primary, white } from '../assets/colors';

export default Filter = ({filters}) => {
    return(
        <View style={styles.container}>
            {filters.map(filter=>
                <View style={styles.card}>
                    <Text style={styles.text}>{filter.text}</Text>
                </View>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        paddingTop:hp('1%'),
        paddingBottom:hp('1%'),
    },
    card:{
        borderRadius:10,
        backgroundColor:primary
    },
    text:{

    }
})