import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, Text, StyleSheet, ScrollView, Image} from "react-native";
import Banner from "../components/Banner";
import {COLORS} from "../config/constants";
import useEvents from "../stores/useEvents";
import TicketBoxLarge from "../components/TicketBoxLarge/TicketBoxLarge";

const Tickets = () => {
    const events = useEvents((state) => state.events);
    const purchasedEventsIdArrLocal = useEvents((state) => state.purchased);
    const [purchasedEventsArray, setPurchasedEventsArray] = useState([])
    const deneme = ["1689340224447", "1689339998551", "1689340108698", "1689360405693"]
    useEffect(() => {
        if (events.length > 0) {
            const arr = deneme.map((x) => {
                return events.find((y) => y.eventId === x)
            }).filter((y) => y !== undefined) //silinmiş bir etkinlik almılarda kalınca eventlerin içerisinde bulamdığı için undefined döndürüyor. onu temizliyoruz.
            setPurchasedEventsArray(arr)
            // console.log(arr)
        }
    },[purchasedEventsIdArrLocal])

    return (
        <View style={styles.container}>
            <Banner/>
            <ScrollView style={styles.scrollView}>
                <View style={styles.ticketsContainer}>
                    {
                        purchasedEventsArray.map((event, index) => {
                            return <TicketBoxLarge
                                key={event.eventId}
                                id={index + 1}
                                event={event}
                            />
                        })
                    }
                </View>
            </ScrollView>
        </View>
    );
};

export default Tickets;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        alignItems: 'center',
        paddingTop: 50,
    },
    scrollView: {
        width: '100%',
        // backgroundColor: 'blue',
    },
    ticketsContainer: {
        width: '100%',
        height: 1000,
    },
});
