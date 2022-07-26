import * as React from 'react';
import {Platform, Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { primary, white } from '../assets/colors';
import { Ionicons as Icon, Fontisto, FontAwesome } from '@expo/vector-icons';
import Notifications from '../screens/notifications/Notifications';
import Settings from '../screens/settings/Settings';
import { useTheme } from '../theme/ThemeContext';
import Theme from '../screens/settings/Theme';
import Messages from '../screens/messages/Messages';
import EventDetails from '../screens/events/EventDetails';
import ChatRoom from '../screens/messages/ChatRoom';
import Slide from '../assets/animation/Slide'
import CreateEvent from '../screens/events/CreateEvent';
import BusinessHome from '../screens/home/BusinessHome';
import Packages from '../screens/others/Packages';
import CardDetails from '../screens/others/CardDetails';
import Account_Setting from '../screens/settings/Account_Setting/Account_Setting';
import Edit_Business from '../screens/settings/Account_Setting/Edit_Business';
import CommonNavigator from './Common_Navigator';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function BusinessNavigator() {
    const {colors} = useTheme();
    return (
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior
        tabBarOptions={{
            keyboardHidesTabBar:true,
            activeTintColor:white,
            showLabel:false,
            style:{
                backgroundColor:primary,
                height:hp('9%'),
                borderTopLeftRadius:hp('3%'),
                borderTopRightRadius:hp('3%'),
                borderColor: colors.background,
                paddingTop: Platform.OS == "ios" ? hp('1.5%') : 0
            },
        }}
      >
        <Tab.Screen 
            options={{
                // tabBarLabel: true,
                tabBarIcon: ({ focused }) => (
                    <>
                        <Icon color={white} size={focused ? 30 : 27} name={'md-home'}/>
                        {true&& <Text style={{fontSize:10, color:white, fontFamily:"Regular"}}>Home</Text>}
                    </>
                ),  
                
            }} 
            name="Home" 
            component={HomeStack}   
        />
        <Tab.Screen 
            options={{
                tabBarIcon: ({ focused }) => (
                    <>
                        <Icon color={white} size={focused ? 30 : 27} name={'add-circle'}/> 
                        {true&& <Text style={{fontSize:10, color:white, fontFamily:"Regular"}}>Create Event</Text>}
                    </>
                ),  
            }} 
            name="CreateEvent" 
            component={CreateEventStack}

        />
        {/* <Tab.Screen 
            options={{
                tabBarIcon: ({ focused }) => (
                    <>
                        <FontAwesome color={white} size={focused ? 30 : 27} name={'envelope'}/>
                        {true&& <Text style={{fontSize:10, color:white, fontFamily:"Regular"}}>Messages</Text>}
                    </>
                ),
                
            }} 
            name="Messages" 
            component={MessagesStack}
        /> */}
        <Tab.Screen 
            options={{
                tabBarIcon: ({ focused }) => (
                    <>
                        <Icon color={white} size={focused ? 30 : 27} name={'notifications'}/>
                        {true&& <Text style={{fontSize:10, color:white, fontFamily:"Regular"}}>Notifications</Text>}
                    </>
                ),
            }} 
            name="Notifications" 
            component={NotificationsStack} 
        />       
      </Tab.Navigator>
  );
}



function HomeStack() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="BusinessHome" component={BusinessHome} />
            <Stack.Screen name="EventDetails" component={EventDetails} />
        </Stack.Navigator>
    );
  }
  
function CreateEventStack() {
    const {colors} = useTheme()
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen initialParams={{colors}} name="CreateEvent" component={CreateEvent} />
            <Stack.Screen name="EventDetails" component={EventDetails} />
        </Stack.Navigator>
    );
}

function MessagesStack() {
    return (
      <Stack.Navigator headerMode={"none"}>
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
      </Stack.Navigator>
    );
}

function NotificationsStack() {
    return (
      <Stack.Navigator headerMode={"none"}>
            <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    );
}
function OtherStack() {
    return (
      <Stack.Navigator headerMode={"none"}>
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="CommonNavigator" component={CommonNavigator}/>
        {/* <Stack.Screen name="Theme" component={Theme} /> */}
        <Stack.Screen name="Packages" component={Packages} />
        <Stack.Screen name="CardDetails" component={CardDetails} />
        {/* <Stack.Screen name="ChatRoom" component={ChatRoom} /> */}
      </Stack.Navigator>
    );
}

  
  
export default function App(){
    const { colors } = useTheme()
    return(
        <>
        <StatusBar animated style={colors.statusBar} /> 
        <Stack.Navigator
            initialRouteName="BottomTabNavigator"
            screenOptions={{
            // animationEnabled:false
                headerShown:false
            }}
        >
            <Stack.Screen name="UserNavigator" component={BusinessNavigator} />
            <Stack.Screen options={{ cardStyleInterpolator: Slide }} name="HomeStack" component={HomeStack} />
            <Stack.Screen options={{ cardStyleInterpolator: Slide }} name="CreateEventsStack" component={CreateEventStack} />
            <Stack.Screen options={{ cardStyleInterpolator: Slide }} name="MessagesStack" component={MessagesStack} />
            <Stack.Screen options={{ cardStyleInterpolator: Slide }} name="NotificationsStack" component={NotificationsStack} />
            <Stack.Screen options={{ cardStyleInterpolator: Slide }} name="OtherStack" component={OtherStack}/>
            {/* <Stack.Screen options={{ cardStyleInterpolator: Slide }} name="CommonNavigator" component={CommonNavigator}/> */}
            {/* <Stack.Screen options={{ cardStyleInterpolator: Slide }} name="Account_Setting" component={Account_Setting}/>
            <Stack.Screen options={{ cardStyleInterpolator: Slide }} name="Edit_Business" component={Edit_Business}/> */}
        </Stack.Navigator>
        </>
    )
  }

