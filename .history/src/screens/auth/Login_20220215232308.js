// import React, {useState} from 'react';
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    Alert,
    Image,
} from 'react-native';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { black, gray, lightGray, primary, purple, white } from '../../assets/colors';
import { Button } from '../../components/common/Button';
import IconInput from '../../components/common/IconInput';
import { useTheme } from '../../theme/ThemeContext';
import { connect } from 'react-redux';
import {Login, socialLogin} from "../../redux/action/LoginAction";
import AuthContext from '../../redux/Context';
import { LoadCategories } from '../../redux/action/CategoriesAction';
import Spinner from "react-native-loading-spinner-overlay";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import { API } from '../../redux/MainURL';
import { uuidv4 } from '../../utils';
import Toast from 'react-native-toast-message'
import SnackBar from '../../components/common/SnackBar';

class Login_Page extends Component{

    constructor(props){
        super(props);
        this.state={
            Email:'',
            Password:'',
        }
    }

    componentDidMount(){
        this.props._Categories()
    }

    onSignInPress = ()=> {
        Keyboard.dismiss()
        if(this.state.Email == "" || this.state.Password == ""){
            Toast.show({text1: "Enter All Fields"})
        }
        else{
            this.props._LoginNow(this.state.Email, this.state.Password,"","", this.context)
            
        }
    }
    SignInWithFaceBook = async() => {
        // this.props.navigation.navigate("Select_Type")
        try {
            await Facebook.initializeAsync({
                appId: '593054675199896',
            });
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                const {id, name} = await response.json();
                this.props.socialLogin(id, name, this.context, this.toast)
            } 
            else {
                console.log(await response.json())
                Toast.show({text1: "Some Problem Occurred"})
            }
        } 
        catch ({ message }) {
            Toast.show({text1: "Some Problem Occurred"})
        }
    }

    SignInWithGoogle=async()=>{
        // this.props.navigation.navigate("Select_Type")
        console.log("LoginScreen.js 6 | loggin in");
        try {
            const { type, user } = await Google.logInAsync({
                iosClientId: `1077446555582-bdt70h0hjsh39cfqvi9sda8b60qakn3r.apps.googleusercontent.com`,
                androidClientId: `1077446555582-g551ajq6trg06i050qci5ah7tamurvr2.apps.googleusercontent.com`,
            });

            if (type === "success") {
                // Then you can use the Google REST API
                console.log("Gmail Success! ");
                console.log("Gmail Info: ", user);
                const {id, name} = user;
                this.props.socialLogin(id, name, this.context, this.toast)
            }
        } catch (error) {
            Toast.show({text1: "Some Problem Occurred"})
        }

    }

    onCreateAccount = () => {
        this.props.navigation.navigate("Signup")
    }    

    render() {
        return (
            <View style={[styles.container,{backgroundColor:white}]}>
                <Image 
                    source={require("../../assets/images/logo.png")}
                    style={{width:hp("15%"), height:hp("15%")}}
                />
                <Text style={styles.heading}>Sign in</Text>
                <IconInput
                    style={styles.InputStyle}
                    icon="mail"
                    placeholder="Email Address"
                    value={this.state.Email}
                    onChange={(text)=>this.setState({Email: text})}
                    iconColor={primary}
                    onSubmitPress={() => this.NextInput.focus()}
                    blur={false}
                    keyboard={"email-address"}
                />
                <IconInput
                    style={styles.InputStyle}
                    icon="key"
                    pass
                    placeholder="Password"
                    value={this.state.Password}
                    onChange={(text)=>this.setState({Password: text})}
                    iconColor={primary}
                    inputRef={ref => { this.NextInput = ref; }}
                    onSubmitPress={this.onSignInPress}
                />
                
                <Button
                    text="SIGN IN"
                    color={purple}
                    textColor={white}
                    onPress={this.onSignInPress}
                    Loading={this.props.Loader}
                    disabled={this.props.Loader&&true}
                />

                <Text onPress={()=> this.props.navigation.navigate("Check_email")} style={{color:lightGray, fontSize:hp('2%'),paddingTop:hp('3%')}}>Forget Password?</Text>

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
                    style={styles.buttonStyle}
                    onPress={this.SignInWithGoogle}
                />
                <Button
                    image={require('../../assets/images/fb.png')}
                    icon="Facebook"
                    text="Sign in with Facebook"
                    color={white}
                    textColor={black}
                    style={styles.buttonStyle}
                    onPress={this.SignInWithFaceBook}
                />
                
                <Text style={{color:lightGray, fontSize:hp('2%'),paddingTop:hp('3%')}}>Don't have an account?</Text>
                <TouchableOpacity style={{marginTop:hp('1%')}} onPress={this.onCreateAccount}>
                    <Text style={{color:lightGray, fontSize:hp('2.25%'), marginTop:hp('0.5%')}}>Create Account</Text>
                </TouchableOpacity>
                <SnackBar/>
            </View>
        );
    }
}

Login_Page.contextType = AuthContext;


function mapStateToProps(state) {
    return{
        Loader:state.LoginReducer.Loader,
        Failed:state.LoginReducer.Failed,
        error:state.LoginReducer.error,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        _LoginNow: (Email, Password,fb_name, fb_id, context)=> dispatch(Login(Email, Password,fb_name, fb_id, context)),
        socialLogin: (id, name, context, toast)=> dispatch(socialLogin(id, name, context, toast)),
        _Categories:()=>dispatch(LoadCategories()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login_Page) ;



const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: primary,
        alignItems:'center',
        paddingTop:hp('10%')
    },
    logo:{
        color:primary,
        fontFamily:"Bold",
        fontSize: hp('5%'),
        letterSpacing:1
    },
    heading:{
        fontSize:hp('3.75%'),
        fontFamily:"Light",
        color:primary,
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
        backgroundColor:lightGray,
        height:hp('0.1%'),
        width:'38%',
    },
    orText:{
        color:lightGray,
        marginLeft:hp('2.5%'),
        marginRight:hp('2.5%'),
        fontFamily:'Regular'
    },
    Txt:{
        color:"red",
        fontSize:hp("2.4%"),
        fontFamily:"Regular",
        marginTop:hp("2%")
    },
    InputStyle:{
        borderColor:primary, 
        borderWidth:hp("0.25%")
    },
    buttonStyle:{
        elevation:4,
        shadowOpacity:0.5,
        shadowOffset:{height:1, width:0},
        shadowColor:'black',
        shadowRadius:2,
    }

})
