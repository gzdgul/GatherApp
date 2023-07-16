import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, Text, StyleSheet, ScrollView, Image} from "react-native";
import Banner from "../components/Banner";
import {COLORS} from "../config/constants";
import EventBoxLarge from "../components/EventBoxLarge/EventBoxLarge";
import useEvents from "../stores/useEvents";

const Likes = () => {
    const events = useEvents((state) => state.events);
    const likedEventsIdArrLocal = useEvents((state) => state.liked);
    const [likedEventsArray, setLikedEventsArray] = useState([])

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
            <Banner/>
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Liked Events</Text>
                <View style={styles.eventNumber}>
                    <Text style={styles.eventNumberText}>{likedEventsArray?.length}</Text>
                </View>
            </View>
            <ScrollView style={{ width: '100%'}}>
                <View style={[styles.eventsContainer, { height: likedEventsArray?.length * 80 + 380}]}>
                    { likedEventsArray.length > 0
                        ?
                        [...likedEventsArray].map((event,index) => {
                            return  <EventBoxLarge
                                key={index}
                                id={index +1}
                                event={event}
                                page={'likes'}
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
                </View>
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
        paddingTop: 50,
    },
    labelContainer: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginVertical: 12,
    },
    labelText: {
        color: COLORS.white,
        fontSize: 28,
        //fontWeight: '700',
        fontFamily: 'RedHatBold'
    },
    eventNumber: {
        width: 45,
        height: 45,
        backgroundColor: COLORS.gray,
        borderRadius: 100,
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
        marginTop: -70,
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
