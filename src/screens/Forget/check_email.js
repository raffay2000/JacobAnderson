// import React, {useState} from 'react';
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
} from 'react-native';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { black, gray, primary, purple, white } from '../../assets/colors';
import { Button } from '../../components/common/Button';
import IconInput from '../../components/common/IconInput';
import Toast from 'react-native-toast-message';
import SnackBar from '../../components/common/SnackBar';
import { API } from '../../redux/MainURL';

var axios = require('axios');
var FormData = require('form-data');
var that;

class Check_Email extends Component{

    constructor(props){
        super(props);
        this.state={
            Check_Email:'',
            Loader:false,
            Failed:false,
            error:""
        }
    }

    componentDidMount(){
        that = this
    }

    PressEmailConfirmation = ()=> {
        // that.props.navigation.navigate("Change_Password")
        Keyboard.dismiss()
        if(that.state.Check_Email == ""){
            Toast.show({text1: "Kindly, Enter Email"})
        }
        else{
            that.setState({Loader:true})
            var data = new FormData();
            data.append('email', that.state.Check_Email);
            
            var config = {
                method: 'post',
                url: API+'forget-password', 
                data
            };

            axios(config)
            .then(function (response) {
                if(response.data.success){
                    that.setState({Loader:false, Failed:false})
                    console.log(JSON.stringify(response.data.code));
                    that.props.navigation.navigate("OTP_CODE", {Verify_Email: that.state.Check_Email})
                }
                else{
                    that.setState({Loader:false, Failed:true, error:response.data.errors[0]})
                    Toast.show({text1:response.data.errors[0]})
                    console.log(JSON.stringify(response.data));
                }
            })
            .catch(function (error) {
                that.setState({Loader:false, Failed:true, error:"Something Went Wrong"})
                Toast.show({text1:"Something Went Wrong"})
                console.log("iserror ",error);
            });
        }
    }
    
    render() {
        return (
            <View style={[styles.container,{backgroundColor:primary}]}>
                {/* <Text style={styles.logo}>LOGO</Text> */}
                <Text style={styles.heading}>Email Confirmation</Text>
                <IconInput
                    icon="mail"
                    placeholder="Enter Your Email"
                    value={this.state.Check_Email}
                    onChange={(text)=>this.setState({Check_Email: text})}
                    iconColor={gray}
                    blur={false}
                    keyboard={"email-address"}
                    onSubmitPress={this.PressEmailConfirmation}
                    // AutoFocus={true}
                />
                
                <Button
                    text={"Confirm Email"}
                    color={purple}
                    textColor={white}
                    onPress={this.PressEmailConfirmation}
                    Loading={this.state.Loader}
                    disabled={this.state.Loader&&true}
                />

                <SnackBar position={"bottom"}/>
            </View>
        );
    }
}

export default Check_Email;


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: primary,
        alignItems:'center',
        justifyContent:"center",
        // paddingTop:hp('20%')
    },
    heading:{
        fontSize:hp('3.75%'),
        fontFamily:"Light",
        color:white,
        marginTop:hp('5%')
    },
})
