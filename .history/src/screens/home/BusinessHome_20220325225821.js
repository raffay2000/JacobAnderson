import React, {Component, useState} from 'react';
import {
    ScrollView,
    ActivityIndicator,
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Container } from '../../components/common/Container';
import Header from '../../components/common/Header';
import { useNavigation } from '@react-navigation/native';
import EventsBy_User from './BusinessEvents';
import {connect, useSelector} from 'react-redux';
import { white } from '../../assets/colors';
import BusinessHomeInitial from '../../components/home-events/BusinessHomeInitial';
import ImageCard from '../../components/home-events/ImageCard';
import { API } from '../../redux/MainURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoadCategories } from '../../redux/action/CategoriesAction';
import { toTitleCase } from '../../utils';

var axios = require('axios');

var that;
class BusinessHome extends Component{

    constructor(props){
        super(props);
        this.state = {
            Search:"",
            Events_ByUser:[],
            loading:false,
            offset:1,
            isListEnd:false,
            success:false,
            error:false,
            ImgPath:"",
            UserID:null,
            refreshing:false,
            userName:"",
            token:null
        }
    }

    onCardPress = (id, name) => {
        this.props.navigation.navigate('EventDetails', {EventID: id, EventName:name, imgPath: this.state.ImgPath})
    }

    componentWillUnmount(){
    //     this.props.onRef(undefined),
         this._unsubscribe();
    }

    componentDidMount(){
        // this.props.onRef(this)
        that= this
        this.props.loadCategories()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            AsyncStorage.getItem("user", (err, data)=> {
                AsyncStorage.getItem("token", (err, token)=> {

                    this.setState({
                        UserID: JSON.parse(data).id, 
                        userName: JSON.parse(data).name,
                        // Events_ByUser:[],
                        loading:false,
                        offset:1,
                        isListEnd:false,
                        // success:false,
                        // error:false,
                        token
    
                    },()=>{
                        this.GetAllEvents_ByUser()
                    })
                })
                console.log("UserId: ", this.state.UserID)
            })
        })
            
    }

    GetAllEvents_ByUser = () => {
        if(!that.state.loading && !that.state.isListEnd){
            // that.setState({loading: true})
            var config = {
                method: 'get',
                url: API+'get-events-by-business/'+this.state.UserID,
                params:{page: that.state.offset},
                headers: {
                    Authorization: "Bearer "+this.state.token
                }
            };
            console.log(config)
            axios(config)
            .then(function (response) {
                if(response.data.success){
                    console.log(response.data.data)
                    that.setState({success:true, error:false, ImgPath:response.data.image_path })
                }
                else{
                    that.setState({error: true})
                }
                if(response.data.data.length > 0){
                    console.log('type', that.state.EventsBy_User)
                    if(that.state.EventsBy_User.length>0 && that.state.offset==1 ){
                        that.setState({ 
                            success:true,
                            Events_ByUser: response.data.data,
                            loading: false, 
                        })
                    }else{
                        that.setState({ 
                            success:true,
                            offset:that.state.offset+1,
                            Events_ByUser: [...that.state.Events_ByUser, ...response.data.data],
                            loading: false, 
                        })
                    }
                }
                else{
                        that.setState({
                            isListEnd: true,
                            loading:false,
                            error:false
                        })
                }
            })
            .catch(function (error) {
                console.log(error);
                that.setState({ 
                    loading: false, 
                    error:true
                })
            });
            }
        }

    renderFooter(){
        if(that.state.loading){
            return <ActivityIndicator style={{ padding: 20 }} size="large" color="#0063DE" />
        }
        else{
            return <View style={styles.viewspace} />
            
        }
    }

    Events_ByUser_Loader(){
        if(this.state.success && this.state.Events_ByUser.length == 0){
            if(!this.state.loading){
                return(
                    <View style={{flex:1, justifyContent:"center", alignItems:"center"}} > 
                        <BusinessHomeInitial/>
                    </View>
                )
            }
        }
        else{
            return(
                <FlatList
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl enabled={true} refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
                    contentContainerStyle={styles.List_style}
                    style={{margin:'-6%', marginTop:"1%"}}
                    data={that.state.Events_ByUser}
                    ItemSeparatorComponent={()=><View style={{height:hp('1%')}}/>}
                    keyExtractor={(item,index)=> index.toString()}
                    renderItem={({item,index}) =>
                            <ImageCard
                                image={{uri: this.state.ImgPath+"/"+item.images[0].event_image}}
                                title={item.name}
                                desc={item.description}
                                loc={item.address1+" "+ item.address2}
                                // date={item.date}
                                onPress={()=> this.onCardPress(item.id, item.name)}
                                hideFavorite
                            />
                    }
                    ListFooterComponent={this.renderFooter()}
                    onEndReached={this.GetAllEvents_ByUser}
                    onEndReachedThreshold={0.5}
                />
            )
        }
    }

    onRefresh = () => {
        this.setState({refreshing: true})
        try{
            this.setState({
                Business:[],
                isListEnd:false,
                loading:false,
                success:false,
            },()=>{
                this.GetAllEvents_ByUser()
                this.setState({refreshing: false})
            })
        }catch(e){
            this.setState({refreshing: false})
            console.log(e)
        }
    }

    render() {
        return (
            <Container>
                <Header
                    heading={"Welcome, "+ toTitleCase(this.state.userName)}
                    icon1={"settings-outline"}
                    icon1Press={()=>this.props.navigation.navigate('OtherStack',{screen:'Settings'})}
                />
                    <View style={{flex:1}}>
                        {
                            !this.state.success && !this.state.error ?
                                <ActivityIndicator style={{ flex:1 }} color="#0063DE" size="large" />
                                :
                                this.Events_ByUser_Loader()
                        }
                    </View>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return{
        loadCategories: () => dispatch(LoadCategories())
    }
}
export default connect(
    null, 
    mapDispatchToProps
)(BusinessHome);

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:"#FFFFFF",
    },
    viewspace:{
        marginBottom:'3%'
    },
    List_style:{
        width:"100%", 
        alignSelf:"center",
        paddingHorizontal:'5%',
        paddingBottom:'5%',
    },
});


// const BusinessHome = () => {
//     let EventByUser;

//     const [refreshing, setRefreshing] = useState(false);
//     const user = useSelector(state => state.LoginReducer.User)
//     const navigation = useNavigation();

//     return(
//         <Container>
//             <Header
//                 heading={"Welcome, "+user.name}
//                 icon1={"settings-outline"}
//                 icon1Press={()=>navigation.navigate('OtherStack',{screen:'Settings'})}
//             />
//             {/* <ScrollView 
//                 showsVerticalScrollIndicator={false}
//                 // refreshControl={
//                 //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//                 // }
//             > */}
//             {/* {!events.length > 0 */}
//                 {/* ?  */}
//                 <>
//                     <EventsBy_User navigation={navigation} onRef={ref=>( EventByUser = ref)} />
//                     {/* 
//                     <ImageCard
//                         style={{height:hp('20%')}}
//                         image={require('../../assets/images/party.png')}
//                         title={"Sant Martin Restaurant"}
//                         desc={"Chicken wings, Chicken BBQ...."}
//                         loc={"14th Street, NewYork, USA"}
//                         discount={"Discount - 70% Off"}
//                         onPress={onCardPress}
//                     /> */}
//                 </>                 
//                 {/* : 
//                 <BusinessHomeInitial/>
//             } */}
//             {/* </ScrollView> */}
//         </Container>
//     )
// }
// export default BusinessHome;