import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, Text, StyleSheet} from "react-native";
import Banner from "../components/Banner";
import {COLORS} from "../config/constants";

const Tickets = () => {
    return (
        <View style={styles.container}>
            <Banner/>

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
});
