import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { gray, primary, purple, white } from '../../assets/colors';
import { Button } from '../../components/common/Button';
import IconInput from '../../components/common/IconInput';
import { useTheme } from '../../theme/ThemeContext'
import UserSignup from '../../components/auth/signup/UserSignup';

const Signup = () => {
    const [switchTab,setSwitchTab] = useState(false); // false for individual
    const navigation = useNavigation()
    const {colors} = useTheme();

    const onSignupPress = () => {
        navigation.navigate('Login')
    }
    return (
        <View style={[styles.container,{backgroundColor:colors.primary}]}>
            <Text style={styles.logo}>LOGO</Text>
            <Text style={styles.heading}>Sign up</Text>
            <View style={styles.tabContainer}>
                <View style={styles.tab}>
                    <Text style={styles.tabText}>Individual</Text>
                </View>
                <View style={styles.tab}>
                    <Text style={styles.tabText}>Business</Text>
                </View>
            </View>
            <UserSignup onSignupPress={onSignupPress}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: primary,
        alignItems:'center',
        paddingTop:hp('20%')
    },
    logo:{
        color: white,
        fontFamily:"Bold",
        fontSize: hp('5%'),
        letterSpacing:1
    },
    heading:{
        fontSize:hp('3.75%'),
        fontFamily:"Light",
        color:white,
        marginTop:hp('5%')
    },
    tabContainer:{
        marginTop:hp('2%'),
        height:hp('4.5%'),
        alignItems:'center',
        width:'80%',
        flexDirection:'row',
        borderWidth:1,
        borderColor:purple,
        borderRadius:hp('1%')
    },
    tab:{
        flex:1,
        height:hp('4.5%'),
        justifyContent:'center',
        alignItems:'center',
    },
    tabText:{
        fontFamily:"Regular",
        fontSize:hp('2.5%')
    }
    
})

export default Signup;