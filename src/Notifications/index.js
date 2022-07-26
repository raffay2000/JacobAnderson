import * as Notifications from "expo-notifications";
import Constants from "expo-constants";


export const  registerForPushNotificationsAsync = async()=> {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = Notifications.requestPermissionsAsync();
            finalStatus = status; 
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = await Notifications.getExpoPushTokenAsync();
        console.log("token",token.data);
        return token.data;
    } 
    else {
        alert('Must use physical device for Push Notifications');
    }


    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
   
    return token;
}

export const SendNotification = async ()=>{
    const message = {
        sound: 'default',
        title: 'Neighbour Service',
        // subtitle:"",
        body: "LYV",
        data: "Jacob Anderson",
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(message),
        
    }).then(()=> console.log("Sent Notification", message));
 }


// export const SendNotificationToAllUsers = async()=> {
//     alert("Notification Sent!")
//     const user =await firebase.firestore().collection("users").get();
//     user.docs.map((user)=>SendNotification(user.data().token) )
// }