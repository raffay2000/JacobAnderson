import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Button } from '../../../components/common/Button';
import IconInput from '../../../components/common/IconInput';
import { gray, primary, purple, white } from '../../../assets/colors';

const BusinessSignup = ({onSignupPress}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [selectedLanguage, setSelectedLanguage] = useState();

    return (
        <>
            <IconInput
                placeholder="Your Business name"
                value={email}
                onChange={(text)=>setEmail(text)}
                iconColor={gray}
                onSubmitPress={()=>inputRef.focus()}
                blur={false}
            />
            <View style={styles.picker}>
                <Picker
                    style={{width:'100%',height:hp('6%'), fontSize:hp('1%')}}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }
                >
                    <Picker.Item label="Select Category" value="Select Category" />
                    <Picker.Item label="Restaurant" value="Restaurant" />
                    <Picker.Item label="Event" value="Event" />
                </Picker>
            </View>
            <Button
                text="SIGN UP"
                color={purple}
                textColor={white}
                onPress={onSignupPress}
            />
            
        </>
    )
}

const styles = StyleSheet.create({
    picker:{
        width:'80%',
        height:hp('6%'),
        backgroundColor:'white',
        borderRadius:hp('1%'),
        marginTop:hp('2.5%')
    }    
})

export default BusinessSignup;