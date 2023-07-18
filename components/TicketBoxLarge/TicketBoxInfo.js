import React from 'react';
import {StyleSheet, View} from "react-native";
import EventBoxLargeInfoPin from "../EventBoxLarge/EventBoxLargeInfoPin";
import {COLORS} from "../../config/constants";

const TicketBoxInfo = ({event}) => {
    return (
        <View style={styles.infoContainer}>
            <View style={styles.pinContainer}>
                <EventBoxLargeInfoPin text={event.dateStart} backgroundColor={COLORS.lightGray}/>
                <EventBoxLargeInfoPin text={event.day + ' DAY'} backgroundColor={COLORS.lightGray}/>
                {/*<EventBoxLargeInfoPin text={'Istanbul'} backgroundColor={COLORS.lightGray}/>*/}
            </View>
            <EventBoxLargeInfoPin text={'ACTIVE'} backgroundColor={COLORS.green}/>
        </View>
    );
};

export default TicketBoxInfo;
const styles = StyleSheet.create({
    infoContainer: {
        // backgroundColor: 'yellow',
        flexDirection: "row",
        paddingHorizontal: 25,
        paddingVertical: 16,
        flexWrap: "wrap",
        gap: 8,
        justifyContent: "space-between",
        top: -35,
    },

    pinContainer: {
        flexDirection: 'row',
        gap: 5,
    }
});
