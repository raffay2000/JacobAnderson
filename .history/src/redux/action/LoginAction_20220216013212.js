import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    DATA,
    TOKEN,
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS
} from "../constants";
import { API } from "../MainURL";
import {navigate} from '../Navigator';
import firebase from "../../firebase";
import { uuidv4 } from "../../utils";
var axios = require('axios');
var FormData = require('form-data');
import Toast from 'react-native-toast-message';

export const Login = (email, password,fb_name, fb_id, context) => {
    return (dispatch)=>{
        dispatch({type: LOGIN })
        var data = new FormData();
        data.append('email', 'business1@gmail.com');
        data.append('password', '123456');

        var config = {
            method: 'post',
            url: API+'login',
            data : data
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            dispatch({type: LOGIN_SUCCESS, error:''})
        })
        .catch(function (error) {
            console.log(error);
            dispatch({type: LOGIN_SUCCESS, error:''})
        });

        // var data = new FormData();
        // data.append('email', email);
        // data.append('password', password);
        // // data.append('fb_name',fb_name);
        // // data.append('fb_id',fb_id);

        // var config = {
        //     method: 'post',
        //     url: API+'login',
        //     data : data
        // };
        // console.log(config)
        // axios(config)
        // .then(async function (response) {
        //     if(response.data.success){
        //         dispatch({type: LOGIN_SUCCESS, error:''})
        //         // console.log(JSON.stringify(response.data.data));
        //         await AsyncStorage.setItem('user', JSON.stringify(response.data.data), (err)=> err?true:false)
        //         await AsyncStorage.setItem('paid', 'false', (err)=> err?true:false)
        //         context.updateState()
        //     }
        //     else{
        //         Toast.show({text1: response.data.message})
        //         dispatch({type: LOGIN_FAILED, error:response.data.message })
        //         console.log(JSON.stringify(response.data.data));
        //     }
        
        // })
        // .catch(function (error) {
        //     dispatch({type: LOGIN_FAILED, error:"Something Went Wrong" })
        //     Toast.show({text1: "Something Went Wrong"})
        //     console.log(error);
        // });

    }
}

export const socialLogin = (id, name, context) => {
    return(dispatch)=>{
        dispatch({type: LOGIN })
        var data = new FormData();
        data.append('social_id', id);
        data.append('name', name);

        var config = {
            method: 'post',
            url: API+'social-login',
           data : data
        };

        
        axios(config)
        .then(async function (response) {
            if(response.data.success){
                const res = response.data.data;
                if(res.type){
                    await AsyncStorage.setItem('user', JSON.stringify(res), (err)=> err?true:false)
                    await AsyncStorage.setItem('paid', 'false', (err)=> err?true:false)
                    context.updateState()
                }else{
                    if(res.firebase_id){
                        await AsyncStorage.setItem('token', res.token, (err)=> err?true:false)
                        navigate("Select_Type",{id: res.id, f_id: res.firebase_id})
                    }else{
                        const uuid = uuidv4();
                        const f_id = await AsyncStorage.getItem('f_id');
                        if(!f_id){
                            // alert(f_id)
                            firebase
                            .firestore
                            .collection('users')
                            .doc(uuid)
                            .set({
                                uid:uuid,
                                // email: Email,
                                name: name,
                                active: false,
                            })
                            .then(async ()=>{
                                AsyncStorage.setItem('f_id', uuid)
                                await AsyncStorage.setItem('token', res.token, (err)=> err?true:false)
                                navigate("Select_Type", {id: res.id, f_id: uuid})
                                // alert('done')
                            })
                            .catch((err)=>{
                                console.log(err)
                                dispatch({type: LOGIN_FAILED, error:"Something Went Wrong" })
                                Toast.show({text1: "Some Problem Occurred"})
                            })
                        }else{
                            await AsyncStorage.setItem('token', res.token, (err)=> err?true:false)
                            navigate("Select_Type", {id: res.id, f_id})
                        }
                    
                    }
                }
                dispatch({type: LOGIN_SUCCESS, error:''});
                // console.log(JSON.stringify(response.data.data));
            }
            else{
                Toast.show({text1: response.data.message})
                dispatch({type: LOGIN_FAILED, error:response.data.message })
                console.log(JSON.stringify(response.data.data));
            }
        
        })
        .catch(function (error) {
            dispatch({type: LOGIN_FAILED, error:"Some Problem Occurred" })
            Toast.show({text1: "Some Problem Occurred"})
            console.log(error);
        });

    }
}


/////////////////////////// LOGIN FACEBOOK ///////////////////////

// export const FB_Login = async() => {
//     return(dispatch) => {
//         try {
//                 dispatch({type: LOGIN});
//                 await Facebook.initializeAsync({
//                     appId: '593054675199896',
//                 });
//                 const {
//                     type,
//                     token,
//                     expirationDate,
//                     permissions,
//                     declinedPermissions,
//                 } = await Facebook.logInWithReadPermissionsAsync({
//                     permissions: ['public_profile'],
//                 });
//                 if (type === 'success') {
//                     dispatch({type: LOGIN_SUCCESS})
//                     const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
//                     await AsyncStorage.setItem('userFB', response.json(), (err)=> err?true:false)
//                     await AsyncStorage.setItem('FBType', "individual", (err)=> err?true:false)
//                 //   Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);

//                 } 
//                 else {
//                     dispatch({type: LOGIN_FAILED})
//                     alert("There is some Problem");
//                 }
//             } 
//             catch ({ message }) {
//                 dispatch({type: LOGIN_FAILED})
//                 alert(`Facebook Login Error: ${message}`);
//             }
//     }
// }

 export const User_Data = (user)=> {
    return{
        type:DATA,
        payload:user
    }
}

export const User_Token = (token) => {
    return{
        type:TOKEN,
        payload:token   
    }
}
    