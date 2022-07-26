import React, {useState, useRef} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { black, gray, primary, purple, white } from '../../assets/colors';
import { Button } from '../../components/common/Button';
import { IconInput } from '../../components/common/IconInput';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const passRef = useRef();
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>LOGO</Text>
            <Text style={styles.heading}>Sign in</Text>
            <IconInput
                icon="mail"
                placeholder="Enter Email Address"
                value={email}
                onChange={(text)=>setEmail(text)}
                iconColor={gray}
                onSubmitPress={passInput.focus()}
            />
            <IconInput
                icon="key"
                placeholder="Enter Password"
                value={password}
                onChange={(text)=>setPassword(text)}
                iconColor={gray}
                ref={passRef}
            />
            <Button
                text="SIGN IN"
                color={purple}
                textColor={white}
            />
            <View style={styles.lineContainer}>
                <View style={styles.line}/>
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line}/>
            </View>
            <Button
                image={require('../../assets/images/google.png')}
                text="Sign in with Google"
                color={white}
                textColor={black}
            />
            <Button
                image={require('../../assets/images/fb.png')}
                icon="Facebook"
                text="Sign in with Facebook"
                color={white}
                textColor={black}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: primary,
        justifyContent:'center',
        alignItems:'center'
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
    lineContainer:{
        flexDirection:'row',
        width:'80%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:hp('2.75%')
    },
    line:{
        backgroundColor:white,
        height:hp('0.1%'),
        width:'38%',
    },
    orText:{
        color:white,
        marginLeft:hp('2.5%'),
        marginRight:hp('2.5%'),
        fontFamily:'Regular'
    }
})

export default Login;