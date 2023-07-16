import 'react-native-reanimated'
import 'react-native-gesture-handler'
import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Pressable, Image, TouchableOpacity} from "react-native";
import { AnimatePresence } from 'moti';
import { View as MotiViews } from 'moti';
import useSelectedEvent from "../../stores/useSelectedEvent";
import {COLORS} from "../../config/constants";
import LoadingSkeleton from "../LoadingSkeleton";
import InsetShadow from "react-native-inset-shadow";
import EventBoxLargeLabel from "./EventBoxLargeLabel";
import EventBoxLargeImg from "./EventBoxLargeImg";
import EventBoxLargeInfoPin from "./EventBoxLargeInfoPin";
import EventBoxLargeDescription from "./EventBoxLargeDescription";
import EventBoxInfo from "../EventBoxInfo";
import LikeButton from "../LikeButton";


const EventBoxLarge = ({id, event, page, selectedEvent, setSelectedEvent}) => {
    const [visible, setVisible] = React.useState(false)

    const [isModalVisible, setModalVisible] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);
    // const [selectedEvent, setSelectedEvent] = React.useState(null);
    if (page === 'home') {}

    useEffect(() => {

    },[])
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handlePress = () => {
        setVisible(!visible);
        if (selectedEvent === id) {
            setSelectedEvent(null);
        } else setSelectedEvent(id);

    }

    return (
        <>
            <Pressable
                onPress={handlePress}>
                <AnimatePresence>
                    <MotiViews
                        transition={{ delay: 0, damping: 12, mass: 0.5 }}
                        animate={{
                            opacity: selectedEvent === id ? 1 : 1,
                            height: selectedEvent === id ? 250 : 180,
                            top: page === 'home'
                                ? (selectedEvent && selectedEvent < id ) ? 175 * id + 80 : 175 * id
                                : (selectedEvent && selectedEvent < id ) ? 90 * id + 160 : 90 * id,
                            scale: selectedEvent === id ? 1 : 0.95,

                            // zIndex: selectedEvent === id ? 20 : -20,
                        }}
                        exitTransition={{
                            type: 'timing',
                            duration: 300,
                        }}
                        style={styles.eventBoxContainer}
                    >
                        <MotiViews
                            transition={{ delay: 300, damping: 12, mass: 0.5 }}
                            animate={{
                                opacity: imageLoaded ? 1 : 0,
                                scale: imageLoaded ? 1 : 0.8,
                            }}
                            exitTransition={{
                                type: 'timing',
                                duration: 300,
                            }}
                            style={{height: '100%', justifyContent: 'space-between', zIndex: 100,}}>
                            <View style={styles.labelContainer}>
                                <EventBoxLargeLabel selectedEvent={selectedEvent} eventId={id} event={event}/>
                                <View style={styles.detailsContainer}>
                                    <LikeButton event={event}/>
                                    <TouchableOpacity style={styles.detailsButton} onPress={toggleModal}>
                                        <Image
                                            source={require('../../assets/fourDotsIcon.png')}
                                            style={{
                                                width: 20, // İkon genişliği
                                                height: 20, // İkon yüksekliği
                                                tintColor: COLORS.white, // İkonun renk durumu
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <EventBoxLargeImg selectedEvent={selectedEvent} eventId={id} event={event} setImageLoaded={setImageLoaded}/>

                            <EventBoxLargeDescription selectedEvent={selectedEvent} eventId={id} event={event}/>

                            <View style={styles.eventInfoContainer}>
                                <EventBoxLargeInfoPin text={event?.dateStart} event={event}/>
                                <EventBoxLargeInfoPin text={`${event?.day} DAY`} event={event}/>
                            </View>

                        </MotiViews>

                        <EventBoxInfo visible={isModalVisible} onClose={toggleModal} event={event}/>

                            <MotiViews
                                transition={{ delay: 0, damping: 12, mass: 0.5 }}
                                animate={{
                                    opacity: imageLoaded ? 0 : 1,
                                    // scale: imageLoaded ? 0.8 : 1,
                                    // display: imageLoaded ? 'none' : 'block',

                                }}
                                exitTransition={{
                                    type: 'timing',
                                    duration: 300,
                                }}
                                style={styles.loadingIndicator}>
                                <LoadingSkeleton/>
                            </MotiViews>
                    </MotiViews>
                </AnimatePresence>

            </Pressable>

        </>

    );
}

export default EventBoxLarge;

const styles = StyleSheet.create({
    eventBoxContainer: {
      width: '100%',
      height: 250,
      justifyContent: 'space-between',
        // alignItems: 'flex-end',
      backgroundColor: 'black',
      borderRadius: 50,
      marginVertical: 8,
        position: "absolute",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.7,
        shadowRadius: 12,

        elevation: 10,
        // paddingVertical: 20,
    },
    eventInfoContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: "flex-end",
        paddingHorizontal: 30,
        paddingVertical: 25,
        // position: "absolute",
        // bottom: 20,
        // right: 20,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingVertical: 25,
    },
    detailsButton: {
      width: 20,
      height: 20,

    },
    detailsContainer: {
        // paddingHorizontal: 20,
        // paddingVertical: 20,
        // position: "absolute",
        flexDirection: 'row',
        // top: 0,
        // right: 0,
        // justifyContent: "flex-end",
        alignItems: "center",
        gap: 15,
    },
    detailsButtonText: {

    },
    loadingIndicator: {
        width: '100%',
        height: 250,
        position: "absolute",
        backgroundColor: 'black',
        borderRadius: 50,
        zIndex: 10,
    }
});
