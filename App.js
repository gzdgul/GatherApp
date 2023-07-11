import {Dimensions, StyleSheet, Text, View, Image, Platform} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import {StatusBar} from "expo-status-bar";
import React from "react";
import Calendar from "./screens/Calendar";
import Likes from "./screens/Likes";
import Notifications from "./screens/Notifications";
import Tickets from "./screens/Tickets";
import {COLORS} from "./config/constants";
import * as Font from 'expo-font';
const MainStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
function CustomTabBarIcon({ source, focused }) {
    return (
        <Image
            source={source}
            style={{
                width: 20, // İkon genişliği
                height: 20, // İkon yüksekliği
                tintColor: focused ? COLORS.purple : 'gray', // İkonun renk durumu
            }}
        />
    );
}
const TabsScreen = ({route}) => {
    const windowWidth = Dimensions.get('window').width;

    return (

        <Tabs.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarLabelStyle: { display: 'none' }, // Ekran isimlerini gizlemek için
                tabBarIcon: ({ focused }) => {
                    let iconSource;

                    if (route.name === 'Home') {
                        iconSource = focused
                            ? require('./assets/homeIcon.png')
                            : require('./assets/homeIcon.png');
                    } else if (route.name === 'Calendar') {
                        iconSource = focused
                            ? require('./assets/calendarIcon.png')
                            : require('./assets/calendarIcon.png');
                    }else if (route.name === 'Likes') {
                        iconSource = focused
                            ? require('./assets/likesIcon.png')
                            : require('./assets/likesIcon.png');
                    }else if (route.name === 'Notifications') {
                        iconSource = focused
                            ? require('./assets/notificationsIcon.png')
                            : require('./assets/notificationsIcon.png');
                    }else if (route.name === 'My Tickets') {
                        iconSource = focused
                            ? require('./assets/ticketIcon.png')
                            : require('./assets/ticketIcon.png');
                    }
                    // Diğer ikon kaynakları...

                    return <CustomTabBarIcon source={iconSource} focused={focused} />;
                },

                tabBarActiveTintColor: COLORS.purple,
                tabBarInactiveTintColor: COLORS.gray,
                // tabBarHideOnKeyboard: true,
                tabBarStyle: [
                    {
                        position: 'absolute',
                        bottom: 30,
                        width: windowWidth * 0.85,
                        left: (windowWidth - (windowWidth * 0.85)) / 2, //absolute kullanarak ortalama
                        height: 55, // Tab bar yüksekliği
                        borderRadius: 30,
                        paddingHorizontal: 20,
                        paddingVertical: Platform.OS === 'android' ? 0 : 30,
                        backgroundColor: COLORS.gray, // Tab bar arka plan rengi
                        borderTopWidth: 0,
                        //alignSelf: 'center', // kendini ortala
                        //borderTopColor: COLORS.purple,
                    },
                    null,
                ],
            })}
        >
            <Tabs.Screen name="Calendar" component={Calendar} />
            <Tabs.Screen name="Likes" component={Likes} />
            <Tabs.Screen name="Home" component={Home}/>
            <Tabs.Screen name="Notifications" component={Notifications} />
            <Tabs.Screen name="My Tickets" component={Tickets} />
        </Tabs.Navigator>
    );
}

export default function App() {

    const [fontsLoaded, setFontsLoaded] = React.useState(false);
    async function loadFonts() {
        await Font.loadAsync({
            'RedHatBold': require('./assets/fonts/RedHatDisplay-Bold.ttf'),
            'RedHatRegular': require('./assets/fonts/RedHatDisplay-Regular.ttf'),
        });
    }
    React.useEffect(() => {
        async function load() {
            await loadFonts();
            setFontsLoaded(true);
        }
        load();
    }, []);
    if (!fontsLoaded) {
        return null; // Yüklenme tamamlanmadıysa hiçbir şey gösterme
    }
  return (

      <NavigationContainer>
          <StatusBar style="light" />
        <MainStack.Navigator screenOptions={{headerShown: false}}>
          <MainStack.Screen name="Tabs" component={TabsScreen} />

        </MainStack.Navigator>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
