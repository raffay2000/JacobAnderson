import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { gray, lightGray, primary, purple, white } from '../../assets/colors';
import { Button } from '../../components/common/Button';
import { Container } from '../../components/common/Container';
import Header from '../../components/common/Header';
import IconInput from '../../components/common/IconInput';
import DateTimePicker from "@react-native-community/datetimepicker";
import ImagePickerExample from '../../components/common/ImagePicker_Comp';
import {connect} from "react-redux";
import {Creating_Event, EventName, EventCategory, EventDescription, EventPhoneNUmber, EventAdd1, EventAdd2, EventDate, EventTime, EventImg1, EventReservation, EventPhoneNumber } from "../../redux/action/CreateEvent_Action";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from "react-native-loading-spinner-overlay";
import { getItem } from '../../persist-storage';
import { LoadCategories } from '../../redux/action/CategoriesAction';
import SnackBar from '../../components/common/SnackBar';

class CreateEvent extends React.Component {
    
    state={
        mode:'date',
        show:false,
        toggle:false,
        Select_Img:null,
        token:"",
        userID:null,
        ReservationPrice:""
    }
    
    onCreateEventPress = () => {
        // this.props.navigation.navigate('OtherStack',{screen:'Packages'})
        return console.log(this.props.EventImg)
       if(
            this.props.EventName =="" ||
            this.props.EventDescription =="" ||
            this.props.EventPhoneNumber =="" ||
            this.props.EventAdd1 =="" ||
            this.props.EventAdd2 =="" ||
            this.props.EventReservation ==""
       ){
            Toast.show({text1: "Fill All Fields"})
       }
       else if( this.props.EventCategory == ""){
            Toast.show({text1: "Select Category"})
       }
       else if( this.props.EventImg==""){
            Toast.show({text1: "Add image"})
       }
       else{
        getItem('paid').then((paid)=>{
            if(paid == "true"){
                const date = this.getDateTime()
                this.props._Creating_Event(
                    this.props.token,
                    this.props.EventName,
                    this.props.EventCategory,
                    this.props.EventDescription,
                    this.props.EventPhoneNumber,
                    this.props.EventAdd1,
                    this.props.EventAdd2,
                    date,
                    this.props.EventReservation,
                    this.props.EventImg,
                    this.props.user.id
                )
            }else{
                this.props.navigation.navigate('OtherStack',{screen:'Packages'})
            }
        })
        
       }
    }

    // componentDidUpdate(){
    //     console.log(this.props.EventImg)
    // }

    componentDidMount(){
        this.props._LoadCategories()
        // AsyncStorage.getItem('user', (err, data)=>{
        //     this.setState({token: JSON.parse(data).token}),
        //     this.setState({userID: JSON.parse(data).id })
        // })
    }
    
    seatIncrement = () => {
        this.props._EventReservation(parseInt(this.props.EventReservation)+1)
        // this.props._EventReservation(this.props.EventReservation+1)
    }
    seatDecrement = () => {
        if(this.props.EventReservation > 0){
            this.props._EventReservation(parseInt(this.props.EventReservation)-1)
        }
    }
    
    getDateTime(){
        const date = this.props.EventDate;
        const day = date.getDate();
        const month = date.getMonth()+1;
        const year = date.getFullYear();
        const hour = date.getHours();
        const min = date.getMinutes();
        const formatDate = year+"-"+month+"-"+day;
        const formatTime = hour+":"+min+":00";
        return formatDate+" "+formatTime;

    };
    onChanges = (event, selectedValue) => {
        this.setState({show: Platform.OS === 'ios'})
        if (this.state.mode === 'date') {
            const currentDate = selectedValue || this.props.EventDate;
            this.props._EventDate(currentDate)
            this.setState({toggle: !this.state.toggle})
            this.setState({mode:'time', show: true})
        } 
        else {
            const selectedTime = selectedValue || this.props.EventDate;
            this.props._EventDate(selectedTime)
            this.setState({show: Platform.OS === 'ios'});
            this.setState({toggle: !this.state.toggle, show:false})
        }
    };

    showMode = (currentMode) => {
        this.setState({show: !this.state.show})
        this.setState({mode: currentMode})
    };
    
    showDatePicker = () => {
        this.showMode('date')
    };
    
    showTimePicker = ()=>{
        this.showMode('time')
    } 

    // dispatch(EventImg1(result.uri, imagesArr ))

    OnImagePick = (index, pickImg) => {
        this.props._EventImg1(index, pickImg,this.props.EventImg )
    } 

    render(){
        const {heading} = this.props.route.params.colors
        return(
            <Container>
                <Header
                    heading="Create Event"
                    icon1={"settings-outline"}
                    icon1Press={()=>this.props.navigation.navigate('OtherStack',{screen:'Settings'})}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <IconInput
                        style={styles.input}
                        placeholder="Event Name"
                        value={this.props.EventName}
                        onChange={(text)=>this.props._EventName(text)}
                        iconColor={gray}
                        onSubmitPress={()=>this.picker.focus()}
                        blur={false}
                    />
                    <View style={[styles.input,styles.picker]}>
                        <Picker
                            ref={input => this.picker = input}
                            style={Platform.OS=="android" && {width:'100%',height:hp('6%')}}
                            // style={{height: 100, width: 100}}
                            selectedValue={parseInt(this.props.EventCategory)}
                            onValueChange={(itemValue, itemIndex) => {
                                    this.props._EventCategory(itemValue)
                                    // this.desc.focus();
                                }
                            }
                        >
                            {/* <Picker.Item key={41} label={"Select Event Category"} value={"Select Event Category"} /> */}
                            {   
                                this.props._Categories.map(e => 
                                    <Picker.Item key={e.id} label={e.category_name} value={e.id} />
                                )
                            }
                        </Picker>
                    </View>
                    <TextInput
                        ref={input => this.desc = input}
                        style={[styles.desc]}
                        value={this.props.EventDescription}
                        onChangeText={(text)=>this.props._EventDescription(text)}
                        multiline
                        placeholder="Enter Description"
                    />
                    <IconInput
                        phone
                        style={styles.input}
                        placeholder="Phone Number"
                        value={this.props.EventPhoneNumber}
                        onChange={(text)=>this.props._EventPhoneNumber(text)}
                        iconColor={gray}
                        onSubmitPress={()=>this.address1.focus()}
                        blur={false}
                        keyboard={"number-pad"}
                    />
                    <IconInput
                        style={styles.input}
                        placeholder="Address Line 1"
                        value={this.props.EventAdd1}
                        onChange={(text)=>this.props._EventAdd1(text)}
                        inputRef={input => this.address1 = input}
                        iconColor={gray}
                        onSubmitPress={()=>this.address2.focus()}
                        blur={false}
                    />
                    <View style={styles.row}>
                        <IconInput
                            style={[styles.input,{flex:5, marginTop:0}]}
                            placeholder="Address Line 2"
                            value={this.props.EventAdd2}
                            onChange={(text)=>this.props._EventAdd2(text)}
                            iconColor={gray}
                            inputRef={input => this.address2 = input}
                            // onSubmitPress={()=>this.DD.focus()}
                            blur={false}
                        />
                        <TouchableOpacity style={[styles.btn]}>
                            <Ionicons size={26} color={white} name="location-sharp"/>
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.heading,{color:heading}]}>Add Event Date</Text>
                    <View style={[styles.row,{justifyContent:'space-between',alignSelf:'center', marginTop:0}]}>
                        <View style={[styles.box,{flex:5}]} >
                            <Text style={styles.dateTxt} > {this.getDateTime()} </Text>  
                        </View>
                        <Ionicons name="calendar" size={26} style={[styles.icon,{flex:1}]} onPress={this.showDatePicker} />
                    </View>
                    
                    <Text style={[styles.heading,{color:heading}]}>Add Event Reservation</Text>
                    <View style={[styles.row,{justifyContent:'space-between',alignSelf:'center', marginTop:0}]}>
                        <IconInput 
                            style={[styles.input,{width:hp('25%')}]}
                            inputStyle={{textAlign:'center'}}
                            placeholder={"00"}
                            value={this.props.EventReservation.toString()}
                            onChange={(text)=>this.props._EventReservation(text)}
                            iconColor={gray}
                            keyboard="number-pad"
                            // inputRef={input => this.reservation = input}
                            blur
                        />
                        <MaterialIcons name="keyboard-arrow-up" size={24} onPress={this.seatIncrement} style={styles.arrowIcon}/>
                        <MaterialIcons name="keyboard-arrow-down" size={24} onPress={this.seatDecrement} style={styles.arrowIcon}/>
                    </View>

                    <Text style={[styles.heading,{color:heading, marginTop:hp("3%")}]}>Add Reservation Price</Text>
                    <View style={[styles.row,{justifyContent:'flex-start',alignSelf:'center', marginTop:0}]}>
                        <IconInput
                            style={[styles.input, {width:hp("25%")}]}
                            placeholder="Add Reservation Price"
                            value={this.state.ReservationPrice}
                            onChange={(text)=>this.setState({ReservationPrice: text})}
                            blur={false}
                        />
                        <MaterialCommunityIcons name="currency-usd" size={24} onPress={this.seatIncrement} style={styles.arrowIcon}/>
                    </View>
                    <Text style={[styles.heading,{color:heading, marginTop:hp("3%")}]}>Add Images for Event</Text>
                    <View style={[styles.row, {justifyContent:"space-around"}]} >
                        <ImagePickerExample OnImagePick={this.OnImagePick} imagesArr={this.props.EventImg} selectImg={this.props.EventImg[0] ? this.props.EventImg[0]: null}  />
                        <ImagePickerExample OnImagePick={this.OnImagePick} imagesArr={this.props.EventImg} selectImg={this.props.EventImg[1] ? this.props.EventImg[1]: null} />
                        <ImagePickerExample OnImagePick={this.OnImagePick} imagesArr={this.props.EventImg} selectImg={this.props.EventImg[2] ? this.props.EventImg[2]: null} />
                        <ImagePickerExample OnImagePick={this.OnImagePick} imagesArr={this.props.EventImg} selectImg={this.props.EventImg[3] ? this.props.EventImg[3]: null} />
                    </View>
                    
                    <Button
                        text="Create Event"
                        color={purple}
                        style={{marginBottom:hp('5%'), width:'100%'}}
                        textColor={white}
                        onPress={this.onCreateEventPress}
                    />
                    
                    <Spinner 
                        visible={this.props.Loader}
                        textStyle={{color:"white", fontFamily:"Bold"}}
                        textContent={"Loading..."}
                    />
                    
                    
                    {this.state.show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={this.props.EventDate}
                            mode={this.state.mode}
                            display="default"
                            onChange={this.onChanges}
                            dateFormat="day month year"
                            style={{width:hp("10%") , height:hp("4%")}}
                        />
                    )}

                </ScrollView>
                <SnackBar position={'top'}/>
            </Container>
        )
    }
   
}

function mapStateToProps(state) {
    return{
        Failed:state.CreateEvent_Reducer.Failed,
        Loader:state.CreateEvent_Reducer.Loader,
        Success:state.CreateEvent_Reducer.Success,
        EventName:state.CreateEvent_Reducer.EventName,
        EventCategory:state.CreateEvent_Reducer.EventCategory,
        EventDescription:state.CreateEvent_Reducer.EventDescription,
        EventPhoneNumber:state.CreateEvent_Reducer.EventPhoneNumber,
        EventAdd1:state.CreateEvent_Reducer.EventAdd1,
        EventAdd2:state.CreateEvent_Reducer.EventAdd2,
        EventDate:state.CreateEvent_Reducer.EventDate,
        // EventTime:state.CreateEvent_Reducer.EventTime,
        EventReservation:state.CreateEvent_Reducer.EventReservation,
        EventImg:state.CreateEvent_Reducer.EventImg,
        _Categories: state.Categories_reducer.Categories,
        token:state.LoginReducer.Token,
        user:state.LoginReducer.User,

    }
}

function mapDispatchToProps(dispatch) {
    return{
        _Creating_Event: (token, EventName, EventCategory,  EventDescription, EventPhoneNumber, EventAdd1, EventAdd2,EventDate, /*EventTime,*/ EventReservation, EventImg, userid) => dispatch(Creating_Event(token, EventName, EventCategory,  EventDescription, EventPhoneNumber, EventAdd1, EventAdd2,EventDate,  /*EventTime,*/ EventReservation, EventImg, userid)),
        _EventName: (text) => dispatch(EventName(text)),
        _EventCategory: (text) => dispatch(EventCategory(text)),
        _EventDescription: (text) => dispatch(EventDescription(text)),
        _EventPhoneNumber: (text) => dispatch(EventPhoneNumber(text)),
        _EventAdd1: (text) => dispatch(EventAdd1(text)),
        _EventAdd2: (text) => dispatch(EventAdd2(text)),
        _EventDate: (text) => dispatch(EventDate(text)),
        // _EventTime: (text) => dispatch(EventTime(text)),
        _EventImg1: (index, text, imagesArr) => dispatch(EventImg1(index, text, imagesArr)),
        _EventReservation: (text) => dispatch(EventReservation(text)),
        _LoadCategories:() => dispatch(LoadCategories()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);


const styles = StyleSheet.create({
    picker:{
        borderRadius:hp('1%')
    },
    input:{
        width:'100%',
        backgroundColor:'#ECECEC',
        marginTop:hp('2%')
    },
    desc:{
        fontSize:hp('2.25%'),
        height:hp('12%'),
        paddingHorizontal:hp('1%'),
        marginTop:hp('2%'),
        backgroundColor:'#ECECEC',
        borderRadius:hp('1%')
    },
    row:{
        marginTop:hp('1.5%'),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:'100%'
    },
    btn:{
        backgroundColor:primary,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:Platform.OS == "android" ? hp('6%') : hp('4.75%'),
        marginLeft:hp('1%'),
        borderRadius:hp('1%')
    },
    heading:{
        marginTop:hp('2%'),
        fontSize:hp('2%'),
        fontFamily:'Regular'
    },
    icon:{
        alignSelf:'center',
        marginTop:hp('0.75%'),
        paddingVertical:hp('1.2%'),
        backgroundColor:'#ECECEC',
        borderRadius:hp('1%'),
        textAlign:'center',
    },
    arrowIcon:{
        backgroundColor:'#ECECEC',
        // paddingVertical:hp('0.5%'),
        marginLeft:hp('1%'),
        padding:Platform.OS == "android" ? hp('1.5%') : hp('1%'),
        marginTop:hp('2%'),
        borderRadius:hp('1%'),
        textAlign:'center',
        flex:1,
    },
    box:{
        // width:"80%",
        flex:1,
        height:hp("6%"),
        alignItems:"center",
        justifyContent:"center",
        borderRadius:hp("0.8%"),
        backgroundColor:'#ECECEC',
    },  
    dateTxt:{
        fontSize:hp('2.4%'),
        fontFamily:'Regular',
    }
})