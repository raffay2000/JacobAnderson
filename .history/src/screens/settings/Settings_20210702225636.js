import React, {useState} from 'react';
import {
    View,
    Text,
} from 'react-native';
import { Container } from '../../components/common/Container';
import SimpleHeader from '../../components/common/SimpleHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Row from '../../components/common/Row';
// import Switch from 'expo-dark-mode-switch';

const notifications = [
    {
        id:1,
        text:"Account Settings",
        icon:"person"
    },
    {
        id:2,
        text:"Notifications",
        icon:"notifications"
    },
    {
        id:3,
        text:"Favorites",
        icon:"heart"
    },
    {
        id:4,
        text:"About App",
        icon:"information-circle"
    },
]

const Settings = () => {
    const [value, setValue] = useState(true)
    return(
        <Container>
            <SimpleHeader
                backIcon
                heading={"Settings"}
            />
            <View style={{marginTop:hp('3%')}}/>
            {/* <Switch value={value} onChange={value => setValue(value)} />; */}
            {notifications.map(item=>
                <Row
                    iconLeft={item.icon}
                    text={item.text}
                />
            )}
        </Container>
    )
}
export default Settings;