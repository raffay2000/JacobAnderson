import React from 'react';
import { 
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
 } from 'react-native';
 import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import { black, primary, white } from '../../assets/colors';

function Option_Card({img , Description , Onpressbtn , as}){
     return(
       
            <TouchableOpacity style={styles.card} onPress={Onpressbtn} >
                <View style={styles.one} >
                    <View style={styles.heading} >
                        <Text style={styles.h1} >
                            Continue as
                        </Text> 
                        <Text style={styles.h2}>
                            {as}
                        </Text>
                    </View>
                    <View style={styles.paragraph} >
                        <Text style={styles.para}>
                            {Description}
                        </Text>
                    </View>
                </View>
                <View style={styles.two} >
                    <Image source={img} style={{width:'100%' , height:"100%" , resizeMode:'contain'}} />
                </View>
            </TouchableOpacity>
       
     );
 }

 const styles = StyleSheet.create({
    
     card:{
        width:hp("35%"),
        height:hp("21%"),
        borderRadius:12,
        flexDirection:'row',
        shadowColor: '#00000029',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity:1,
        shadowRadius: 10,
        elevation:5,
        padding:'3%',
        alignSelf:'center',
        marginBottom:'10%',
        backgroundColor:white,
     },
     one:{
         flex:1,
         justifyContent:'space-between'
     },
     two:{
        flex:1,
    },
    
    h1:{
        fontFamily:'Bold',
        fontSize:hp("2.2%"),
        color:'#000000',
        letterSpacing:0,
    },
    h2:{
        fontFamily:'Bold',
        fontSize:hp("2%"),
        color:'#2E8BFF',
        letterSpacing:0,
    },
    para:{
        fontFamily:'Regular',
        fontSize:hp("1.5%"),
        color:'#777777',
        letterSpacing:0,
    }

 });

 export default Option_Card;