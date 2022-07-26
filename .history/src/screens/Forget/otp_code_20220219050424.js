// import React, {useState} from 'react';
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
} from 'react-native';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { gray, primary, purple, white } from '../../assets/colors';
import { Button } from '../../components/common/Button';
import IconInput from '../../components/common/IconInput';
import Toast from "react-native-toast-message";
import { API } from '../../redux/MainURL';
import SnackBar from '../../components/common/SnackBar';

var axios = require('axios');
var FormData = require('form-data');

var that;

class OTP_Code extends Component{

    constructor(props){
        super(props);
        this.state={
            code:'',
            Loader:false,
            Failed:false,
            error:"",
            VerifyEmail:this.props.route.params.Verify_Email
        }
    }

    componentDidMount(){
        that=this;
        console.log("Check Email ", this.state.VerifyEmail)
    }

    Check_Code = ()=> {
        Keyboard.dismiss()
        if(that.state.code == ""){
            Toast.show({text1: "Kindly, Enter the Code"})
        }
       else{
            that.setState({Loader: true})
            var data = new FormData();
            data.append('code', that.state.code);
            data.append('email', that.state.VerifyEmail);

            var config = {
                method: 'post',
                url: API+'forget-password-code',
                data
            };

            axios(config)
            .then(function (response) {
                if(response.data.success){
                    that.setState({Loader:false, Failed:false})
                    that.props.navigation.navigate("Change_Password", {VerifyEmail: that.state.VerifyEmail})
                    console.log(JSON.stringify(response.data));
                }
                else{
                    console.log(JSON.stringify(response.data));
                    that.setState({Loader:false, Failed:true})
                    Toast.show({text1: response.data.message})
                }
            })
            .catch(function (error) {
                console.log(error);
                that.setState({Loader:false, Failed:false})
                Toast.show({text1: "Something Went Wrong"})
            });
       }
    }
    
    render() {
        return (
            <View style={[styles.container,{backgroundColor:primary}]}>
                <Text style={styles.heading}>Email Verification</Text>
                <Text style={styles.Para}>
                    Email verification code has been send on <Text style={[styles.Para, {color:white, fontFamily:"Bold", fontSize:hp("2.25%")}]} >{this.state.VerifyEmail}</Text>, Kindly enter your code to change your Password, Thank You!
                </Text>
                <IconInput
                    placeholder="000000"
                    value={this.state.code}
                    onChange={(text)=>this.setState({code: text})}
                    inputStyle={styles.CodeInput}
                    style={styles.mainInp}
                    iconColor={gray}
                    // maxlength={6}
                    blur={false}
                    keyboard={"decimal-pad"}
                    onSubmitPress={this.Check_Code}
                />
                
                <Button
                    text="Verify"
                    color={purple}
                    textColor={white}
                    onPress={this.Check_Code}
                    Loading={this.state.Loader}
                    disabled={this.state.Loader&&true}
                />
                <SnackBar position={'bottom'}/>

            </View>
        );
    }
}

export default OTP_Code;


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: primary,
        alignItems:'center',
        justifyContent:"center",
        padding:hp('1%')
    },
    heading:{
        fontSize:hp('3.75%'),
        fontFamily:"Bold",
        color:white,
        alignSelf:"center",
        marginTop:hp('1%'),
        letterSpacing:2,

    },
    Para:{
        fontSize:hp('2.25%'),
        fontFamily:"Regular",
        color:white,
        marginTop:hp('5%'),
        textAlign:'left',
        width:"85%",
        lineHeight: hp('2.75%')
    },
    mainInp:{
        backgroundColor:primary,
        marginTop:hp("3%")
    },
    CodeInput:{
        borderBottomWidth:1,
        borderBottomColor:white,
        fontSize:hp('3.75%'),
        fontFamily:"Bold",
        color:white,
        letterSpacing:hp("4%"),
        textAlign:'center',
        paddingBottom: hp('1%')
    }
})
