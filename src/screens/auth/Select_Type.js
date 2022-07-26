import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet, 
    TouchableOpacity
} from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { black, primary, white } from '../../assets/colors';
import { Button } from '../../components/common/Button';
import Option_Card from '../../components/common/Option_Card';
import Header from '../../components/common/Header';
import {Container} from '../../components/common/Container';
import Spinner from 'react-native-loading-spinner-overlay';
import { API } from '../../redux/MainURL';
import { navigate } from '../../redux/Navigator';
import AuthContext from '../../redux/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-easy-toast";
var axios = require('axios');
var FormData = require('form-data');
var that;

export default class Select_Type extends Component {

    state={
        loading: false,
    }
    componentDidMount(){
        that = this
    }
    continueAsIndividual = () => {
        const {id, f_id} = this.props.route.params;
        console.log(id, f_id)
        this.setState({loading:true});
        var data = new FormData();
        data.append('type', 'individual');
        data.append('firebase_id', f_id);

        var config = {
            method: 'post',
            url: API+'jacobanderson_app/public/api/edit-user/'+id,
            data : data
        };

        axios(config)
        .then(async function (response) {
            if(response.data.success){
                that.setState({loading:false});
                await AsyncStorage.removeItem('f_id')
                const token = await AsyncStorage.getItem('token')
                response.data.data.token = token;
                await AsyncStorage.setItem('user', JSON.stringify(response.data.data), (err)=> err?true:false)
                await AsyncStorage.setItem('paid', 'false', (err)=> err?true:false)
                that.context.updateState();
            }else{
                that.setState({loading:false})
                that.toast.show("Cannot Login",1000)
            }
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
            that.toast.show("Some Problem Occurred",1000)
        });

    }
    continueAsBusiness = () => {
        const {id, f_id} = this.props.route.params;
        this.props.navigation.navigate("Business_Form",{id, f_id})
    }
    render() {
        return (
            <Container>
                <Header backIcon />
                <View style={styles.main} >
                    <Option_Card 
                        as={"Individual"}
                        Description={"Select Event"}
                        Onpressbtn={this.continueAsIndividual}
                        img={require("../../assets/images/logo.png")}
                    />

                    <Option_Card 
                        as={"Business"}
                        Description={"For creating an event"}
                        Onpressbtn={this.continueAsBusiness}
                        img={require("../../assets/images/logo.png")}
                    />
                </View>
                <Spinner
                    visible={this.state.loading}
                />
                <Toast
                    ref={(toast) => this.toast = toast}
                    style={{backgroundColor:"black", width:"96%", zIndex:1}}
                    position="bottom"
                    positionValue={hp("6%")}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white', fontFamily:"Bold", fontSize:hp("1.8%")}}
                />
            </Container>

        )
    }
}
Select_Type.contextType = AuthContext;

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:white,
        paddingHorizontal:hp("2%"),
        // paddingTop:hp("15%"),
        alignItems:"center",
        justifyContent:"center"
    },
    Txt:{
        color:primary,
        fontFamily:"Regular",
        fontSize: hp('1.7%'),
        letterSpacing:1,
        textAlign:"justify"
    },
    Heading_Txt:{
        color:black,
        fontFamily:"Bold",
        fontSize: hp('2.5%'),
        letterSpacing:1,
        marginBottom:hp("1%"),
        alignSelf:"flex-start"
    }
});