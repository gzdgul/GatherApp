import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {COLORS} from "../../config/constants";

const TicketBoxLine = () => {
    return (
        <View style={styles.lineContainer}>
            <Text numberOfLines={1} ellipsizeMode="clip" style={styles.line}
            > - - - - - - - - - - - - - - - - - - - - - - - </Text>
            <View style={styles.deadAreaContainer}>
                <View style={styles.deadArea}></View>
                <View style={styles.deadArea}></View>
            </View>

        </View>
    );
};

export default TicketBoxLine;

const styles = StyleSheet.create({
    lineContainer: {
        // height: 82,
        // backgroundColor: 'yellow',
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        top: -26,

    },
    line: {
        fontSize: 40,
        fontFamily: 'RedHatLight',
        color: COLORS.ash,
        maxWidth: '100%',
    },
    deadArea: {
        width: 35,
        height: 35,
        backgroundColor: COLORS.black,
        borderRadius: 50,
    },
    deadAreaContainer: {
        width: '110%',
        flexDirection: 'row',
        justifyContent:'space-between',
        position: "absolute",
        top: 12,
    },
});
