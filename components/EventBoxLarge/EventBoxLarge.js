import 'react-native-reanimated'
import 'react-native-gesture-handler'
import React from 'react';
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


const EventBoxLarge = ({id, event}) => {
    const [visible, setVisible] = React.useState(false)
    const setSelectedEvent = useSelectedEvent((state) => state.setSelectedEvent);
    const selectedEvent = useSelectedEvent((state) => state.selectedEvent);
    const [isModalVisible, setModalVisible] = React.useState(false);

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
            <Pressable
             onPress={handlePress}>
             <AnimatePresence>
                 <MotiViews
                     transition={{ delay: 0, damping: 12, mass: 0.5 }}
                     animate={{
                         opacity: selectedEvent === id ? 1 : 1,
                         height: selectedEvent === id ? 220 : 180,
                         top: (selectedEvent && selectedEvent < id ) ? 80 * id + 160 : 80 * id,
                         scale: selectedEvent === id ? 1 : 0.95,
                         // zIndex: selectedEvent === id ? 20 : -20,
                     }}
                     exitTransition={{
                         type: 'timing',
                         duration: 300,
                     }}
                     style={styles.eventBoxContainer}
                 >
                     {
                         event.backgroundUrl ?
                             <>
                             <EventBoxLargeImg selectedEvent={selectedEvent} eventId={id} event={event}/>
                             <EventBoxLargeLabel selectedEvent={selectedEvent} eventId={id} event={event}/>
                             <View style={styles.eventInfoContainer}>
                                <EventBoxLargeInfoPin text={event.dateStart} event={event}/>
                                <EventBoxLargeInfoPin text={`${event.day} DAY`} event={event}/>
                             </View>
                            <EventBoxLargeDescription selectedEvent={selectedEvent} eventId={id} event={event}/>
                                 <TouchableOpacity style={styles.detailsButton} onPress={toggleModal}>
                                     <Image
                                         source={require('../../assets/fourDotsIcon.png')}
                                         style={{
                                             width: 18, // İkon genişliği
                                             height: 18, // İkon yüksekliği
                                             tintColor: COLORS.white, // İkonun renk durumu
                                         }}
                                     />
                                 </TouchableOpacity>

                             </>
                             : <LoadingSkeleton/>
                     }
                     <EventBoxInfo visible={isModalVisible} onClose={toggleModal} event={event}/>
                 </MotiViews>
             </AnimatePresence>
         </Pressable>

    );
}

export default EventBoxLarge;

const styles = StyleSheet.create({
    eventBoxContainer: {
      width: '100%',
      height: 200,
      backgroundColor: 'black',
      borderRadius: 30,
      marginVertical: 8,
        position: "absolute",

    },
    eventInfoContainer: {
        flexDirection: 'row',
        gap: 10,
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    detailsButton: {
      width: 45,
      height: 45,
      position: "absolute",
      top: 0,
      right: 0,
      backgroundColor: COLORS.gray,
      justifyContent: "center",
      alignItems: "center",
      borderColor: COLORS.black,
        borderWidth: 2,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,

    },
    detailsButtonText: {

    },
});
