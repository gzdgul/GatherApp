import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, Text, StyleSheet, ScrollView, Image} from "react-native";
import Banner from "../components/Banner";
import {COLORS} from "../config/constants";
import EventBoxLarge from "../components/EventBoxLarge/EventBoxLarge";
import useEvents from "../stores/useEvents";
import PageLabel from "../components/PageLabel";
import useSelectedEvent from "../stores/useSelectedEvent";
import { View as MotiViews } from 'moti';


const Likes = () => {
    const events = useEvents((state) => state.events);
    const likedEventsIdArrLocal = useEvents((state) => state.liked);
    const [likedEventsArray, setLikedEventsArray] = useState([])
    const [isScrolledUp, setIsScrolledUp] = React.useState(false);
    const setSelectedEventLikesPage = useSelectedEvent((state) => state.setSelectedEventLikesPage);
    const selectedEventLikesPage = useSelectedEvent((state) => state.selectedEventLikesPage);


    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent;
        const scrollPosition = contentOffset.y;
        // setContentOffset(scrollPosition);
        const screenHeight = layoutMeasurement.height;
        const ekran20 = screenHeight * 0.2;
        // console.log(contentOffset.y)
        if (scrollPosition > 45 && likedEventsArray.length > 3) {
            console.log('%50 SCROLLANDI !!!!!!!!!!!!!!!!!!!!!!!!')
            setIsScrolledUp(true);
        }
        if (scrollPosition <= 0) {
            console.log('!!!!!!!! ASAGI SCROLLANDI !!!!!!!!!!!!!!!!!!!!!!!!')
            setIsScrolledUp(false);
        }


    };

    useEffect(() => {
        if (events.length > 0) {
            const arr = likedEventsIdArrLocal.map((x) => {
                return events.find((y) => y.eventId === x)
            }).filter((y) => y !== undefined) //silinmiş bir etkinlik beğenmelerde kalınca eventlerin içerisinde bulamdığı için undefined döndürüyor. onu temizliyoruz.
            setLikedEventsArray(arr)
            console.log(arr)
        }
    },[likedEventsIdArrLocal])

    return (
        <View style={styles.container}>
            <Banner scrolledUp={isScrolledUp}/>
            <ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={16}
                stickyHeaderIndices={[0]}
                style={{ width: '100%', marginTop: -20,}}>
                <View>
                    <PageLabel text={'Liked Events'} number={likedEventsArray.length} isScrolledUp={isScrolledUp}/>
                </View>
                <MotiViews
                    transition={{ delay: 0, damping: 12, mass: 0.5 }}
                    animate={{
                        height: selectedEventLikesPage
                            ? likedEventsArray?.length * 90 + 460
                            : likedEventsArray?.length * 90 + 200,
                    }}
                    exitTransition={{
                        type: 'timing',
                        duration: 300,
                    }}
                    style={styles.eventsContainer}>
                    { likedEventsArray.length > 0
                        ?
                        [...likedEventsArray].map((event,index) => {
                            return  <EventBoxLarge
                                key={event.eventId} //kayma ve cache sorunu çözüldü
                                id={index +1}
                                event={event}
                                page={'likes'}
                                selectedEvent={selectedEventLikesPage}
                                setSelectedEvent={setSelectedEventLikesPage}
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
                            <Text style={{color: COLORS.stone}}>Opss... there are no events you like</Text>
                        </View>
                    }
                </MotiViews>
            </ScrollView>
        </View>
    );
};

export default Likes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        alignItems: 'center',
        // paddingTop: 50,
    },

    eventsContainer: {
        position: "relative",
        width: '100%',
        flexDirection: 'column', // Dikey olarak üst üste sıralama
        marginTop: -90,
        // backgroundColor: 'red',
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
