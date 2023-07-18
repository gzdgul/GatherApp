import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {COLORS} from "../../config/constants";
import EventBoxLargeInfoPin from "../EventBoxLarge/EventBoxLargeInfoPin";
import TicketBoxLabel from "./TicketBoxLabel";
import TicketBoxLine from "./TicketBoxLine";
import TicketBoxInfo from "./TicketBoxInfo";
import {View as MotiViews} from "moti/build/components/view";
import {LinearGradient} from "expo-linear-gradient";
import useSelectedEvent from "../../stores/useSelectedEvent";

const TicketBoxLarge = ({id, event}) => {
    const setSelectedEventTicketsPage = useSelectedEvent((state) => state.setSelectedEventTicketsPage);
    const selectedEvenTicketsPage = useSelectedEvent((state) => state.selectedEvenTicketsPage);

    const handlePress = () => {
        if (selectedEvenTicketsPage === id) {
            setSelectedEventTicketsPage(null);
        } else setSelectedEventTicketsPage(id);
    }

    return (
        <Pressable onPress={handlePress}>
            <MotiViews
                transition={{ delay: 0, damping: 12, mass: 1 }}
                animate={{
                    top: (selectedEvenTicketsPage && selectedEvenTicketsPage < id) ? 170 * id + 90 : 170 * id,
                    scale: selectedEvenTicketsPage === id ? 1 : 0.95
                }}

                exitTransition={{
                    type: 'timing',
                    duration: 300,
                }}
                style={styles.ticketContainer}
            >
                <TicketBoxLabel event={event}/>
                <TicketBoxLine/>
                <TicketBoxInfo event={event} />
                <Image
                    source={{
                        uri: event.backgroundUrl,
                    }}
                    style={{
                        width: '100%', // img genişliği
                        height: 50, // img yüksekliği
                        borderRadius: 0,
                        position: 'absolute',
                        bottom: -5, //animasyondaki white line bug çözüldü
                    }}
                />
                <LinearGradient
                    style={{ width: '100%', height: '100%', borderRadius: 40, position: 'absolute', zIndex: 10,}}
                    colors={['transparent', COLORS.shadowColor]}
                    start={{ x: 0.6, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    pointerEvents="none" // LinearGradient'in tıklanabilirliğini devre dışı bırakıyoruz.
                >
                </LinearGradient>
            </MotiViews>
        </Pressable>


    );
};

export default TicketBoxLarge;

const styles = StyleSheet.create({
    ticketContainer: {
        width: '100%',
        height: 240,
        backgroundColor: COLORS.white,
        borderRadius: 40,
        position: "absolute",
        overflow: "hidden",
        // borderWidth: 2,
        // borderColor: COLORS.black,
        // shadowColor: "#000000",
        // shadowOffset: {
        //     width: 0,
        //     height: 0,
        // },
        // shadowOpacity: 0.7,
        // shadowRadius: 12,
        //
        // elevation: 20,
    },
});
