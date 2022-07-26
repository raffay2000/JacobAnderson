import React,{useState} from 'react';
import {
    View,
    Image
} from 'react-native';
import LottieView from 'lottie-react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ImageLoader = (props) => {
    const [isLoaded,setIsLoaded] = useState(false);
    return(
        <View style={{flex:1, justifyContent:'center'}}>
            {!isLoaded && <LottieView style={[props.style,{position:'absolute', height:hp('3%'), }]} source={require('../../assets/animation/loader.json')} autoPlay loop />}
            <Image
                style={props.style} 
                source={props.source}
                onLoad={()=>setIsLoaded(true)}
            />
        </View>
    )
}
export default ImageLoader;