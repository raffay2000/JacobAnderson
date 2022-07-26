import { Picker } from '@react-native-picker/picker';
import React, { Component } from 'react'
import { 
    ScrollView, 
    Text, 
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform,
    Image
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { gray, primary, purple, white } from '../../assets/colors';
import { Button } from '../../components/common/Button';
import { Container } from '../../components/common/Container';
import * as ImagePicker from 'expo-image-picker';
import IconInput from '../../components/common/IconInput';
import SimpleHeader from '../../components/common/SimpleHeader';
import {Ionicons} from "@expo/vector-icons";
import { connect } from 'react-redux';
import { API } from '../../redux/MainURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../redux/Context';
import Toast from 'react-native-easy-toast';
var axios = require('axios');
var FormData = require('form-data');
var that;

const constStyle = {
    width:'80%',
    height:hp('6%'),
    backgroundColor:'white',
    borderRadius:hp('1%'),
    marginTop:hp('2.5%'),
    borderColor:"lightgray",
        borderWidth:2,
}

const ImgComp=({image, onPress, style})=>{
    return(
        <TouchableOpacity style={[styles.Container, {...style}]} onPress={onPress} >
            {!image && <Ionicons size={hp("3%")} color={"white"} name="add-circle" />}
            {image && <Image source={{ uri: image }} style={{ width: "100%", height: "100%", borderRadius:hp("0.8%") }} />}
        </TouchableOpacity>
    )
}

class Business_Form extends Component {

    constructor(props){
        super(props);
        this.state = {
            Business_Name:"",
            Category:[],
            Description:"",
            PhoneNumber:"",
            Add1:"",
            Add2:"",
            AddImg:[null, null, null, null],
            Img:null,
            Business_ID:null,
            Loader:false,
            Failed:false,
            Success:false,
            path: null
        }
    }
    componentDidMount(){
        that = this;
        this.requestPermission()
    }
    async requestPermission(){
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
    imagePicker = async (index) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
        if(!result.cancelled){
            const images = this.state.AddImg;
            images[index] = result.uri;
            this.setState({AddImg:images});
        }
    }
    onContinuePress = () => {
        this.setState({Loader:true})
        const {id, f_id} = this.props.route.params;
                
        var data = new FormData();
        data.append('name', this.state.Business_Name);
        data.append('firebase_id', f_id);
        data.append('type', 'company');
        data.append('category', this.state.Category);
        data.append('description', this.state.Description);
        data.append('phone', this.state.PhoneNumber);
        data.append('address1', this.state.Add1);
        data.append('address2', this.state.Add2);
        this.state.AddImg.forEach((element, i )=> {
            if(element){
                const newFile = {
                    name: "images.jpg",
                    type: "images/jpeg",
                    uri: Platform.OS === "android" ?element : element.replace("file://", "")
                }  
                data.append("images[]", newFile)
            }
            
        })
        var config = {
            method: 'post',
            url: API+'jacobanderson_app/public/api/edit-business/'+id,
            data : data
        };
        console.log("config", config)
        axios(config)
        .then(async function (response) {
            if(response.data.success){
                that.setState({Loader:false});
                await AsyncStorage.removeItem('f_id')
                const token = await AsyncStorage.getItem('token');
                response.data.data.token = token;
                await AsyncStorage.setItem('user', JSON.stringify(response.data.data), (err)=> err?true:false)
                await AsyncStorage.setItem('paid', 'false', (err)=> err?true:false)
                that.context.updateState();
            }else{
                that.setState({Loader:false})
                that.toast.show("Cannot Login",1000)
            }
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
            that.setState({Loader:false})
            that.toast.show("Some Problem Occurred",1000)
        });

    }
    render() {
        return (
            <Container>
                <SimpleHeader 
                    heading={"Add Business Details"}
                />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems:"flex-start"}} >
                    <IconInput
                        icon={"business"}
                        placeholder="Your Business Name"
                        value={this.state.Business_Name}
                        onChange={(text)=>this.setState({Business_Name:text})}
                        iconColor={gray}
                        onSubmitPress={()=>this.inputRef.focus()}
                        blur={false}    
                        style={styles.InputStyle}
                    />
                   
                    <View style={constStyle}>
                        <Picker
                            style={{width:'100%',height:hp('6%')}}
                            selectedValue={this.state.Category}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({Category: itemValue})
                            }
                        >
                            {
                                this.props._Categories.map(e=>
                                    <Picker.Item key={e.id} label={e.category_name} value={e.id} />
                                )
                            }
                        </Picker>
                    </View>
                    <TextInput
                        style={[constStyle, styles.desc, styles.InputStyle]}
                        value={this.state.Description}
                        multiline
                        ref={ref => { this.inputRef = ref; }}
                        onChangeText={(text)=>this.setState({Description: text})}
                        placeholder="Enter Description"
                    />
                    <IconInput
                        phone
                        placeholder="Phone Number"
                        value={this.state.PhoneNumber}
                        onChange={(text)=>this.setState({PhoneNumber: text})}
                        iconColor={gray}
                        // inputRef={ref => { this.inputRef4 = ref; }}
                        onSubmitPress={()=>this.inputRef1.focus()}
                        blur={false}
                        style={styles.InputStyle}
                    />
                    <IconInput
                        placeholder="Address Line 1"
                        value={this.state.Add1}
                        onChange={(text)=>this.setState({Add1: text})}
                        iconColor={gray}
                        inputRef={ref => { this.inputRef1 = ref; }}
                        onSubmitPress={()=>this.inputRef2.focus()}
                        blur={false}
                        style={styles.InputStyle}
                    />
                    <View style={styles.row}>
                        <IconInput
                            style={{flex:5}}
                            placeholder="Address Line 2"
                            value={this.state.Add2}
                            onChange={(text)=>this.setState({Add2: text})}
                            iconColor={gray}
                            inputRef={ref => {this.inputRef2 = ref; }}
                            blur={false}
                            style={[styles.InputStyle, {width:"80%"}]}
                        />
                        <TouchableOpacity style={[constStyle, styles.btn]}>
                            <Ionicons size={30} color={primary} name="location-sharp"/>
                        </TouchableOpacity>
                    </View>
                   
                    <View style={[styles.row, {marginTop:hp("2%"),width:"100%", justifyContent:"space-between"}]}  >
                        {this.state.AddImg.map((item, index)=>
                                <ImgComp image={item} onPress={() => this.imagePicker(index)} />
                            )}
                        {/* <ImgComp  image={this.state.AddImg[1] ? this.state.AddImg[1] : null} Onpress={()=>alert("Image")} />
                        <ImgComp  image={this.state.AddImg[2] ? this.state.AddImg[2] : null} Onpress={()=>alert("Image")} />
                        <ImgComp  image={this.state.AddImg[3] ? this.state.AddImg[3] : null} Onpress={()=>alert("Image")} /> */}
                    </View>

                    <Button
                        text="CONTINUE"
                        color={purple}
                        style={{marginBottom:hp('5%'), alignSelf:"center"}}
                        textColor={white}
                        onPress={this.onContinuePress}
                    /> 

                    <Spinner 
                        visible={this.state.Loader}
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
               </ScrollView>

            </Container>
       );
    }
}

const mapStateToProps = state => {
    return{
        _Categories: state.Categories_reducer.Categories,
    }
}

export default connect(mapStateToProps, null)(Business_Form)

Business_Form.contextType = AuthContext;

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:"white",
    },
    desc:{
        height:hp('12%'),
        paddingHorizontal:hp('1%'),
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:'80%'
    },
    btn:{
        backgroundColor:white,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:hp('6.5%'),
        marginLeft:hp('1%'),
    },
    InputStyle:{
        borderColor:"lightgray",
        borderWidth:2,
        width:"100%"
    },
    img:{
        width:"80%",
        height:hp("15%"),
        borderColor:"lightgray",
        borderWidth:2,
        borderRadius:hp("0.8%")
    },
    Container:{
        backgroundColor:gray,
        width:hp("8%"),
        height:hp("8%"),
        borderRadius:hp("0.8%"),
        alignItems:"center",
        justifyContent:"center",
    }
});