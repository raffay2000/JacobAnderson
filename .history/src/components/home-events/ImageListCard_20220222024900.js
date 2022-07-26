import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    Modal,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ImageViewer from 'react-native-image-zoom-viewer'
import { Ionicons as Icon } from '@expo/vector-icons';
import ImageLoader from '../common/ImageLoader';
import { useTheme } from '../../theme/ThemeContext';

var urlImages = [];

const ImageListCard = ({imagePath, images, text}) => {
    useEffect(()=>{
        urlImages=[]
        images.map(image=>urlImages.push({url:imagePath+'/'+image.user_image}))
    })
    console.log(urlImages)
    const {colors} = useTheme();
    const [imageDisplay,setImageDisplay] = useState({uri:images[0]});
    const [visible,setVisible] = useState(false);
    return(
        // <View style={styles.container}>
        //     <Text style={styles.text}>{props.text}</Text>
        //     <Image style={styles.mainImage} source={props.image}/>
        //     <View style={styles.imageRow}>
        //         <ScrollView  horizontal>
        //             <Image style={styles.image} source={props.image}/>
        //             <Image style={styles.image} source={props.image}/>
        //             <Image style={styles.image} source={props.image}/>
        //             <Image style={styles.image} source={props.image}/>
        //             <Image style={styles.image} source={props.image}/>
        //         </ScrollView>
        //     </View>
        // </View>
        <View style={styles.container}>
            <Text style={[styles.text,{color: colors.text}]}>{text}</Text>
            <Modal 
                onRequestClose={()=>setVisible(false)}
                visible={visible}
            >
                <ImageViewer 
                    enablePreload
                    enableImageZoom
                    onLongPress={()=>setVisible(false)}
                    renderHeader={()=>
                        <TouchableOpacity style={{top: hp('1.25%'), position: "absolute", zIndex: 9999,alignSelf:'flex-end'}} onPress={()=>setVisible(false)}>
                            <Icon name={"close"} size={35} style={{margin:20}} color="white"/>
                        </TouchableOpacity>
                    }
                    onSwipeDown={()=>setVisible(false)}
                    enableSwipeDown
                    imageUrls={urlImages}
                />
            </Modal>
            
                    
        </View>
    )
}  
export default ImageListCard;

const styles = StyleSheet.create({
    container:{
        // marginTop:hp('1.5%')
    },
    text:{
        marginBottom:hp('1.75%'),
        color:"#A2A2A2"
    },
    imageRow:{
        flexDirection:'row',
        marginTop:hp('1.5%'),
    },
    mainImage:{
        height:hp('25%'),
        width:'100%',
        borderRadius:hp('1%'),
    },
    image:{
        height:hp('8%'),
        width:wp('22%'),
        borderRadius:hp('1%'),
        marginRight:hp('1%')
    },
    
})