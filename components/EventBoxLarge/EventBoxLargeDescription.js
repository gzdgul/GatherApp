import React from 'react';
import {View as MotiViews} from "moti/build/components/view";
import {StyleSheet, Text} from "react-native";
import {COLORS} from "../../config/constants";

const EventBoxLargeDescription = ({selectedEvent, eventId, event}) => {
    return (
        <MotiViews
            transition={{ delay: 10, damping: 20, mass: 0.8 }}
            animate={{
                top: 85,
                left: 65,
                opacity: selectedEvent === eventId ? 0.8 : 0,
            }}

            exitTransition={{
                type: 'timing',
                duration: 300,
            }}
            style={styles.descriptionContainer}
        >
            <Text style={styles.descriptionText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate eaque iure maiores perferendis quas suscipit!</Text>
        </MotiViews>
    );
};

export default EventBoxLargeDescription;
const styles = StyleSheet.create({
    descriptionContainer: {
        width: '75%',
        position: "absolute",
    },
    descriptionText: {
        color: COLORS.white,
        fontFamily: 'RedHatRegular',

    }
});
