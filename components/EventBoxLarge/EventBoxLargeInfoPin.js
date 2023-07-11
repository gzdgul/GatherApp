import React from 'react';
import {ImageBackground, Platform, StyleSheet, Text, View} from "react-native";
import { BlurView } from 'expo-blur';
import {COLORS} from "../../config/constants";

const EventBoxLargeInfoPin = ({text}) => {
    return (
        text.length > 0 && (
                <View style={styles.infoPin}>
                    {
                        Platform.OS === 'android'
                        ?    <View style={styles.blurView}></View>
                        :    <BlurView intensity={80} style={styles.blurView}></BlurView>


                    }

                        <Text style={styles.infoPinText}>{text}</Text>
                </View>
        )
    );
};
export default EventBoxLargeInfoPin;

const styles = StyleSheet.create({
    infoPin: {
        backgroundColor: COLORS.test,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        overflow: "hidden",
    },
    blurView: {
       width: 1000,
        height: 1000,
        position: "absolute",
    },

    infoPinText: {
        color: COLORS.white,
        fontFamily: 'RedHatBold'
    },
});