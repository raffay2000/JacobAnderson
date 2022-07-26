import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
} from 'react-native';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Button } from '../../../components/common/Button';
import SnackBar from '../../../components/common/SnackBar';
import IconInput from '../../../components/common/IconInput';
import { gray, purple, white } from '../../../assets/colors/index';
import Toast from "react-native-easy-toast";
import { Container } from '../../../components/common/Container';
import SimpleHeader from '../../../components/common/SimpleHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../../redux/MainURL';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
var axios = require('axios');
var FormData = require('form-data');
var that;

class Edit_Account extends Component{

    constructor(props){
        super(props);
        this.state={
            check_pass: false,
            Name:"",
            Profile_Image:null,
            Failed:false,
            Loader:false,
            UserID:null,
        }
    }

    componentDidMount(){
        this.setState({Name:this.props.user.name})
        that= this;
        AsyncStorage.getItem('user', (err, data)=> {
            this.setState({UserID:JSON.parse(data).id})
        })
    }

    Edit_Account = () => {
        if(this.state.Name == "")
            {
                this.setState({Failed: true})
                BaseToast.show("Please fill all fields", 1000)
            }
        else{
            Keyboard.dismiss()
            that.setState({Loader: true})
            var data = new FormData();
            data.append('name', this.state.Name);

            var config = {
                method: 'post',
                url: API+'edit-user/'+this.state.UserID,
                data : data
            };

            axios(config)
            .then(function (response) {
                if(response.data.success){
                    that.setState({Loader:false, Failed:false})
                    that.toast.show(response.data.message,1000)
                    that.setState({Name: ""})
                    console.log(JSON.stringify(response.data));
                }
                else{
                    that.setState({Loader:false, Failed:true})
                    that.toast.show(response.data.message,1000)
                    console.log(JSON.stringify(response.data));
                }
            })
            .catch(function (error) {
                console.log(error);
                that.setState({Loader:false, Failed:true})
                that.toast.show("Somthing Went Wrong",1000)
            });
        }
    }

    render() {
        return (
            <Container>
                 <SimpleHeader
                    backIcon
                    heading={"Edit Account"}
                />
                <IconInput
                    icon="person"
                    placeholder={"Enter your name"}
                    value={this.state.Name}
                    onChange={(text)=>this.setState({Name: text})}
                    iconColor={gray}
                    blur={false}
                    style={styles.InputStyle}
                />
                <Button
                    text="Save"
                    color={purple}
                    textColor={white}
                    onPress={this.Edit_Account}
                    style={{marginBottom:hp('5%'), alignSelf:"center", width: '100%'}}
                    Loading={this.state.Loader}
                    disabled={this.state.Loader}
                />
                <SnackBar position={'bottom'}/>
                <View style={{height:hp("15%")}} />
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return{
        user:state.LoginReducer.User,
        token   :state.LoginReducer.Token,
    }
}

export default connect(mapStateToProps, null)(Edit_Account);

const styles = StyleSheet.create({
    Txt:{
        color:"white",
        fontSize:hp("2.4%"),
        fontFamily:"Regular",
        marginTop:hp("2%")
    },
    InputStyle:{
        borderColor:"lightgray",
        borderWidth:2,
        width:"100%"
    },
    
})