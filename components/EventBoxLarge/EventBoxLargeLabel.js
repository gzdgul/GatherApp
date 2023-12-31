import React from 'react';
import {StyleSheet, Text} from "react-native";
import {View as MotiViews} from "moti/build/components/view";
import {COLORS} from "../../config/constants";

const EventBoxLargeLabel = ({selectedEvent, eventId, event}) => {
    return (
        <MotiViews
            transition={{ delay: 10, damping: 20, mass: 0.8 }}
            animate={{
                // backgroundColor: selectedEvent === id ? 'white' : 'green',
                top: selectedEvent === eventId ? 35: 0,
                left: selectedEvent === eventId ? 40: 0,
                scale: selectedEvent === eventId ? 1: 0.95,

                // blurRadius: selectedEvent === id ? 10 : 0,
            }}

            exitTransition={{
                type: 'timing',
                duration: 300,
            }}
            style={styles.eventLabelContainer}
        >
            <Text style={styles.labelText}>{event.label}</Text>
        </MotiViews>
    );
};

export default EventBoxLargeLabel;

const styles = StyleSheet.create({

    labelText: {
        color: COLORS.white,
        fontSize: 18,
        letterSpacing: 0.5,
        fontFamily: 'RedHatBold',
        // textShadowRadius: 4,
        // textShadowColor: COLORS.black,
        elevation: 10,

    },

    eventLabelContainer: {
        // marginVertical: 20,
        // marginHorizontal: 20,
    }
});
