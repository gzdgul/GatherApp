import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity} from "react-native";
import {COLORS} from "../config/constants";
import * as Font from "expo-font";

import EventBoxLarge from "../components/EventBoxLarge/EventBoxLarge";
import useCurrentUser from "../stores/useCurrentUser";
import {addNewEvent} from "../firebase";
import useEvents from "../stores/useEvents";
import Banner from "../components/Banner";
import {View as MotiViews} from "moti/build/components/view";
import PageLabel from "../components/PageLabel";
import useSelectedEvent from "../stores/useSelectedEvent";

const Home = ({navigation}) => {
    const currentUser = useCurrentUser((state) => state.currentUser);
    const events = useEvents((state) => state.events);
    const [isScrolledUp, setIsScrolledUp] = React.useState(false);
    const setSelectedEventHomePage = useSelectedEvent((state) => state.setSelectedEventHomePage);
    const selectedEventHomePage = useSelectedEvent((state) => state.selectedEventHomePage);


    React.useEffect(() => {
        console.log('currentUser', currentUser)
    },[currentUser])

    // const addEvent = async () => {
    //     await addNewEvent(
    //         'Fotoğrafçılık Turu',
    //         '05.01.2024',
    //         '08.02.2024',
    //         '3',
    //         '199',
    //         ['Fotoğrafçılık', 'Manzara', 'Portre', 'Sokak fotoğrafçılığı'],
    //         'https://i.ibb.co/474fcTf/ghhgfh.png',
    //         'Bu tur, fotoğrafçılığa ilgi duyanlara yöneliktir. Katılımcılar, deneyimli fotoğrafçılar eşliğinde şehrin ve doğanın en güzel noktalarını keşfedecek, farklı fotoğraf tekniklerini öğrenecek ve unutulmaz anları kamera ile yakalayacaklar.'
    //         )
    // }

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent;
        const scrollPosition = contentOffset.y;
        // setContentOffset(scrollPosition);
        const screenHeight = layoutMeasurement.height;
        const ekran20 = screenHeight * 0.2;
        // console.log(contentOffset.y)
        if (scrollPosition > 45) {
            // console.log('%50 SCROLLANDI !!!!!!!!!!!!!!!!!!!!!!!!')
            setIsScrolledUp(true);
        }
        if (scrollPosition <= 0) {
            // console.log('!!!!!!!! ASAGI SCROLLANDI !!!!!!!!!!!!!!!!!!!!!!!!')
            setIsScrolledUp(false);
        }


    };

    return (
       <View style={styles.container}>
            <Banner scrolledUp={isScrolledUp}/>

           <ScrollView style={{ width: '100%', marginTop: -20}}
                       scrollEnabled={events.length > 0}
                       onScroll={handleScroll}
                       scrollEventThrottle={16}
                       stickyHeaderIndices={[0]}
           >
                <View>
                   <PageLabel text={'Upcoming Events'} number={events?.length} isScrolledUp={isScrolledUp}/>
                </View>

               <View style={[styles.eventsContainer, { height: events?.length * 175 + 380}]}>
                   { events.length > 0
                       ?
                       [...events].reverse().map((event,index) => {
                           return  <EventBoxLarge
                               key={event.eventId}
                               id={index +1}
                               event={event}
                               page={'home'}
                               selectedEvent={selectedEventHomePage}
                               setSelectedEvent={setSelectedEventHomePage}
                               navigation={navigation}
                           />
                       })
                       : <View style={styles.noEventContainer}>
                           <Image
                               source={require('../assets/noEvent.png')}
                               style={{
                                   width: 160,
                                   height: 160,
                                   tintColor: COLORS.stone,
                               }}
                           />
                           <Text style={{color: COLORS.stone}}>Opss... there are no events</Text>
                       </View>
                   }

               </View>
           </ScrollView>
       </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        alignItems: 'center',
        // paddingTop: 50,
        // paddingHorizontal: 4,
        //justifyContent: 'center',
    },
    banner: {
        width: '100%',
        height: 180,
        borderRadius: 30,
        backgroundColor: COLORS.stone,
        justifyContent: "flex-end",
        padding: 10,
    },
    label: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    userButton: {
        width: 55,
        height: 55,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    bannerText: {
      color: COLORS.ash,
        fontSize: 13,
        fontWeight: '600',
    },
    settings: {
        width: 55,
        height: 55,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    searchContainer: {
        width: '100%',
        height: 55,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        marginTop: 12,
    },
    inputContainer: {
        flex: 1,
        backgroundColor: COLORS.sBlack,
        paddingHorizontal: 25,
        paddingVertical: 20,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    input: {
        color: COLORS.white,
    },
    icon: {
        width: 55,
        height: 55,
        backgroundColor: COLORS.purple,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    labelContainer: {
      width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingHorizontal: 20,
        paddingVertical: 20,
        // backgroundColor: 'red',
    },
    labelText: {
      color: COLORS.white,
        fontSize: 28,
        //fontWeight: '700',
        fontFamily: 'RedHatBold'
    },
    labelTextContainer: {

        // paddingHorizontal: 16,
        paddingRight: 16,
        backgroundColor: COLORS.black,
        borderBottomRightRadius: 30,

        justifyContent: "center",
        alignItems: "center",
    },
    eventNumber: {
        // paddingHorizontal: 16,
        // paddingLeft: 36,
        paddingRight: 36,
        // paddingVertical: 8,
        backgroundColor: COLORS.black,
        borderBottomLeftRadius: 50,
        // borderTopLeftRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    eventNumberText: {
      fontSize: 22,
        color: COLORS.ash,
        fontFamily: 'RedHatBold',
    },
    eventsContainer: {
        position: "relative",
        width: '100%',
        flexDirection: 'column', // Dikey olarak üst üste sıralama
        marginTop: -175,
    },
    noEventContainer: {
        marginTop: 100,
        width: '100%',
        height: 180,
        // backgroundColor: 'red',
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
});
