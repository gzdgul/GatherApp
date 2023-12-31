import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {COLORS} from "../config/constants";
import {View as MotiViews} from "moti/build/components/view";

const PageLabel = ({text, number, isScrolledUp}) => {
    return (
        <MotiViews
            transition={{ delay: 0, damping: 20, mass: 0.8 }}
            animate={{
                top: isScrolledUp ? -100: 0,
                paddingVertical:  isScrolledUp ? 0 : 20,
                // scale: isScrolledUp ? 0 : 1
                opacity: isScrolledUp ? 0 : 1,
            }}

            exitTransition={{
                type: 'timing',
                duration: 150,
            }}
            style={styles.labelContainer}>
            <MotiViews
                transition={{ delay: 10, damping: 20, mass: 0.8 }}
                animate={{
                    top:  0,
                    left:  0,
                    scale:  1,
                    paddingRight: 16,
                    paddingLeft:  20,
                    paddingTop: 10,
                    marginTop:  20,
                    borderTopRightRadius:  30,
                    paddingVertical:  8,
                    // opacity: isScrolledUp ? 0 : 1,
                }}

                exitTransition={{
                    type: 'timing',
                    duration: 150,
                }}
                style={styles.labelTextContainer}
            >
                <Text style={styles.labelText}>{text}</Text>
            </MotiViews>
            <MotiViews
                transition={{ delay: 10, damping: 20, mass: 0.8 }}
                animate={{
                    opacity: isScrolledUp ? 0 : 1,
                    // top: isScrolledUp ? -35: 0,
                    // right: isScrolledUp ? -10: 0,
                    // scale: isScrolledUp ? 0.8: 1,
                    // paddingLeft: isScrolledUp ? 50: 20,
                    // paddingRight: isScrolledUp ? 40: 15,
                    // paddingTop: isScrolledUp ? 50: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderTopLeftRadius: 50,
                    marginTop:  isScrolledUp ? 0: 20,
                    // paddingVertical: isScrolledUp ? 20 : 8,
                }}

                exitTransition={{
                    type: 'timing',
                    duration: 10,
                }}
                style={styles.eventNumber}
            >
                <Text style={styles.eventNumberText}>{number}</Text>
            </MotiViews>

        </MotiViews>

    );
};

export default PageLabel;

const styles = StyleSheet.create({

    labelContainer: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingHorizontal: 20,
        // paddingVertical: 20,
        // marginTop: 20,
        // backgroundColor: 'yellow',
    },
    labelText: {
        color: COLORS.white,
        fontSize: 28,
        //fontWeight: '700',
        fontFamily: 'RedHatBold'
    },
    labelTextContainer: {

        // paddingHorizontal: 16,
        paddingRight: 16,
        backgroundColor: COLORS.black,
        borderBottomRightRadius: 30,

        justifyContent: "center",
        alignItems: "center",
    },
    eventNumber: {
        // paddingHorizontal: 16,
        // paddingLeft: 36,
        paddingRight: 36,
        // paddingVertical: 8,
        backgroundColor: COLORS.black,
        borderBottomLeftRadius: 50,
        // borderTopLeftRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    eventNumberText: {
        fontSize: 22,
        color: COLORS.ash,
        fontFamily: 'RedHatBold',
    },
});
