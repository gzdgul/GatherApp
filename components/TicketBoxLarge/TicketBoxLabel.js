import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../../config/constants";

const TicketBoxLabel = ({event}) => {
    return (
        <View style={styles.labelContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20,}}>
                <Image
                    source={{
                        uri: event.backgroundUrl,
                    }}
                    style={{
                        width: 55, // img genişliği
                        height: 55, // img yüksekliği
                        borderRadius: 50,
                    }}
                />
                <Text style={styles.eventLabel}>{event.label}</Text>
            </View>
            <TouchableOpacity>
                <Image
                    source={require('../../assets/fourDotsIcon.png')}
                    style={{
                        width: 20, // İkon genişliği
                        height: 20, // İkon yüksekliği
                        tintColor: COLORS.stone, // İkonun renk durumu
                        zIndex: 200,

                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default TicketBoxLabel;
const styles = StyleSheet.create({
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
        paddingHorizontal: 25,
        paddingVertical: 16,
        // borderWidth: 2,
        // borderColor: COLORS.ash,
        // borderStyle: 'dashed',

    },
    eventLabel: {
        fontSize: 18,
        fontFamily: 'RedHatBold',
    },

});
