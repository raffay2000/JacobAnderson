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
import { Container } from '../../../components/common/Container';
import SimpleHeader from '../../../components/common/SimpleHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../../redux/MainURL';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import AuthContext from '../../../redux/Context';
import { contextType } from 'lottie-react-native';
var axios = require('axios');
var FormData = require('form-data');
var that;

class Edit_Account extends Component{

    constructor(props){
        super(props);
        this.state={
            // check_pass: false,
            Name:"",
            // Profile_Image:null,
            Failed:false,
            Loader:false,
            // UserID:null,
        }
    }

    componentDidMount(){
        this.setState({Name:this.props.user.name})
        that= this;
        // AsyncStorage.getItem('user', (err, data)=> {
        //     this.setState({UserID:JSON.parse(data).id})
        // })
    }

    Edit_Account = () => {
        Keyboard.dismiss()
        if(this.state.Name == "")
        {
            this.setState({Failed: true})
            Toast.show({text1: "Please fill all fields"})
        }
        else{
            that.setState({Loader: true})
            var data = new FormData();
            data.append('name', this.state.Name);

            var config = {
                method: 'post',
                url: API+'edit-user/'+this.props.user.id,
                data : data,
                headers: {
                    Authorization: "Bearer "+this.props.token
                }
            };

            axios(config)
            .then(function (response) {
                if(response.data.success){
                    that.setState({Loader:false, Failed:false})
                    const userData = that.props.user;
                    userData.name = that.state.Name;
                    AsyncStorage.setItem('user', JSON.stringify({user: userData}), (err)=> err?true:false)
                    Toast.show({text1: "Profile Updated Successfully"});
                    that.context.updateState()
                    // that.setState({Name: ""});
                    console.log(JSON.stringify(response.data));
                }
                else{
                    that.setState({Loader:false, Failed:true})
                    Toast.show({text1: "Can't Update Profile"})
                    console.log(JSON.stringify(response.data));
                }
            })
            .catch(function (error) {
                console.log(error);
                that.setState({Loader:false, Failed:true})
                Toast.show({text1: "Something Went Wrong"})
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

Edit_Account.contextType = AuthContext

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