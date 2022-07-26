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
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { API } from '../../redux/MainURL';
import SnackBar from '../../components/common/SnackBar';

var axios = require('axios');
var FormData = require('form-data');

var that;

class Change_Password extends Component{

    constructor(props){
        super(props);
        this.state={
            Password:'',
            C_Password:'',
            Loader:false,
            Failed:false,
            Success:false,
            error:"",
            VerifyEmail:this.props.route.params.VerifyEmail
        }
    }

    componentDidMount(){
        that=this;
        console.log("Check Email ", this.state.VerifyEmail)
    }

    Change_Password = ()=> {
        Keyboard.dismiss()
        if(that.state.Password =="" || that.state.C_Password == ""){
            Toast.show({text1: "Kindly, Enter Password"})
        }
        else if(that.state.Password !== that.state.C_Password ){
            Toast.show({text1: "Password Doesn't Match"})
        }
        else{
            that.setState({Loader: true})
            var data = new FormData();
            data.append('email', that.state.VerifyEmail);
            data.append('password', that.state.Password);

            var config = {
            method: 'post',
            url: API+'reset-password',
            data : data
            };

            axios(config)
            .then(function (response) {
                if(response.data.success){
                    that.setState({Loader:false, Failed:false, Success:true})
                    Toast.show({text1: "Password Changed Successfully"})
                    setTimeout(()=> {
                        that.props.navigation.navigate("Login")
                    }, 1500)
                    console.log(JSON.stringify(response.data));
                }
                else{
                    that.setState({Loader:false, Failed:true, Success:false})
                    Toast.show({text1: response.data.errors[0]})
                    console.log(JSON.stringify(response.data));
                }
            })
            .catch(function (error) {
                console.log(error);
                that.setState({Loader:false, Failed:false, Success:false})
                that.toast.show("Something Went Wrong", 1000)
            });
        }
    }
    
    render() {
        return (
            <View style={[styles.container,{backgroundColor:primary}]}>
                <Text style={styles.heading}>Reset Password</Text>
                <Text style={styles.Para}>
                    <Text style={[styles.Para, {color:white, fontFamily:"Bold", fontSize:hp("2.6%")}]} >{this.state.VerifyEmail}</Text> That's great! Now you are verified. Kindly, change your password below, Thank You!
                </Text>
                <IconInput
                    icon="key"
                    pass
                    placeholder="Password" 
                    value={this.state.Password}
                    onChange={(text)=>this.setState({Password: text})}
                    iconColor={gray}
                    onSubmitPress={() => this.NextInput.focus()}
                    blur={false}
                />

                <IconInput
                    icon="key"
                    pass
                    placeholder="Confirm Password"
                    value={this.state.C_Password}
                    onChange={(text)=>this.setState({C_Password: text})}
                    iconColor={gray}
                    inputRef={ref => { this.NextInput = ref; }}
                    onSubmitPress={this.Change_Password}
                />
                
                <Button
                    text="Done"
                    color={purple}
                    textColor={white}
                    Loading={this.state.Loader}
                    onPress={this.Change_Password}
                />

                <SnackBar position={'bottom'}/>                
            </View>
        );
    }
}

export default Change_Password;


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: primary,
        alignItems:'center',
        justifyContent:"center",
    },
    heading:{
        fontSize:hp('3.75%'),
        fontFamily:"Bold",
        color:white,
        marginTop:hp('5%'),
        letterSpacing:2
    },
    Para:{
        fontSize:hp('2%'),
        fontFamily:"Regular",
        color:white,
        marginTop:hp('2%'),
        textAlign:'left',
        width:"85%"
    },
})
