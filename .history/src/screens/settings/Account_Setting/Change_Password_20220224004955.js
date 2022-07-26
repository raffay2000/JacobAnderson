// import React, {useState} from 'react';
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
} from 'react-native';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { black, gray, primary, purple, white } from '../../../assets/colors/index';
import { Button } from '../../../components/common/Button';
import IconInput from '../../../components/common/IconInput';
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import SimpleHeader from '../../../components/common/SimpleHeader';
import { Container } from '../../../components/common/Container';
import { API } from '../../../redux/MainURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from '../../../components/common/SnackBar';
import { connect } from 'react-redux';

var axios = require('axios');
var FormData = require('form-data');
var that;

class Change_Password extends Component{

    constructor(props){
        super(props);
        this.state={
            Current_Password:'',
            New_Password:'',
            Conf_Password:'',
            Loader:false,
            Failed:false,
            Success:false,
            error:"",
        }
    }

    componentDidMount(){
        that= this;
    }

    Change_Password = ()=> {
        Keyboard.dismiss()
        if(this.state.Current_Password =="" || this.state.Conf_Password == "" || this.state.New_Password==""){
            Toast.show({text1: "Kindly Fill All Fields"})
        }
        else if(this.state.Conf_Password !== this.state.New_Password){
            Toast.show({text1: "Password Doesn't Match"})
        }
        else{
            this.setState({Loader: true})
            var data = new FormData();
            data.append('current_password', this.state.Current_Password);
            data.append('new_password', this.state.New_Password);

            var config = {
                method: 'post',
                url: API+'change-password/'+this.props.user.id,
                data : data,
                headers: {
                    Authorization: "Bearer "+this.props.token,
                }
            };

            axios(config)
            .then(function (response) {
                if(response.data.success){
                    that.setState({Loader: false, Success:true})
                    Toast.show({text1: "Password Changed Successfully"})
                    that.getInitialState()
                }
                else{
                    that.setState({Loader: false, Failed:true, Success:false})
                    Toast.show({text1: response.data.message})
                    console.log(JSON.stringify(response.data));
                }
            })
            .catch(function (error) {
                console.log(error);
                that.setState({Loader: false, Failed:true, Success:false})
                Toast.show({text1: "Something Went Wrong"})
            });
        }
    }

    getInitialState = () => {
        this.setState({Conf_Password:"", New_Password:"", Current_Password:""})
    }
    
    render() {
        return (
            <Container>
                <SimpleHeader
                    backIcon
                    heading={"Change Password"}
                />
                <Text style={styles.heading}>Create Your New Password</Text>
                <IconInput
                    icon="key"
                    pass
                    placeholder="Current Password" 
                    value={this.state.Current_Password}
                    onChange={(text)=>this.setState({Current_Password: text})}
                    iconColor={gray}
                    onSubmitPress={() => this.NextInput.focus()}
                    style={styles.InputStyle}
                    blur={false}
                />

                <IconInput
                    icon="key"
                    pass
                    placeholder="New Password"
                    value={this.state.New_Password}
                    onChange={(text)=>this.setState({New_Password: text})}
                    iconColor={gray}
                    inputRef={ref => { this.NextInput = ref; }}
                    onSubmitPress={() => this.NextInput1.focus()}
                    style={styles.InputStyle}
                    blur={false}
                />

                <IconInput
                    icon="key"
                    pass
                    placeholder="Confirm Password"
                    value={this.state.Conf_Password}
                    onChange={(text)=>this.setState({Conf_Password: text})}
                    iconColor={gray}
                    inputRef={ref => { this.NextInput1 = ref; }}
                    onSubmitPress={this.Change_Password}
                    style={styles.InputStyle}
                />
                
                <View style={styles.btn} >
                    <Button
                        text="Back"
                        color={purple}
                        textColor={white}
                        style={{width:"48%"}}
                        onPress={()=> this.props.navigation.goBack()}
                    />
                    <Button
                        text="Change"
                        color={purple}
                        textColor={white}
                        style={{width:"48%"}}
                        onPress={this.Change_Password}
                    />
                </View>

                <Spinner
                    visible={this.state.Loader}
                    textContent={"Loading..."}
                    textStyle={{fontFamily:"Bold", fontSize:hp("2.2%"), color:"white"}}
                />

                <SnackBar position={"bottom"}/>
            </Container>
        );
    }
}
function mapStateToProps(state) {
    return{
        user : state.LoginReducer.User,
        token : state.LoginReducer.Token,
    }
}

export default connect(mapStateToProps, null)(Change_Password);


const styles = StyleSheet.create({
    heading:{
        fontSize:hp('2.75%'),
        fontFamily:"Bold",
        color:gray,
        marginTop:hp('5%'),
        letterSpacing:2
    },
    InputStyle:{
        borderColor:gray,
        borderWidth:hp("0.2%"),
        width:"100%",
        marginBottom:hp("0.5%")
    },
    btn:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    }
})
