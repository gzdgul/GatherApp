import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, Text, StyleSheet} from "react-native";

const Likes = () => {
    return (
        <View style={styles.container}>

            <Text>Likes</Text>
        </View>
    );
};

export default Likes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b91d1d',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
