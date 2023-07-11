import React from 'react';
import {View as MotiViews} from "moti/build/components/view";
import {Image, StyleSheet, View} from "react-native";
import InsetShadow from "react-native-inset-shadow";
import {COLORS} from "../../config/constants";


const EventModalImg = ({isScrolledUp, event}) => {
    return (
        <View style={styles.container}>

        <MotiViews
            transition={{ delay: 0, damping: 30, mass: 1 }}
            animate={{
                opacity: isScrolledUp ? 0.7 : 0.85,
                height: isScrolledUp ? 150 : 330,
                tintColor: 'black',

            }}

            exitTransition={{
                type: 'timing',
                duration: 300,
            }}
            style={styles.backgroundImgContainer}
        >
            <InsetShadow
                containerStyle={styles.shadowContainer}
                shadowRadius={20}
                //shadowOffset={50}
                elevation={25}
                shadowOpacity={1}
                color="black"
                right={true}
                bottom={true}

            >
            <Image
                style={styles.backgroundImg}
                resizeMode={'cover'}
                // blurRadius={ isScrolledUp ? 5 : 0}
                source={{
                    uri: event.backgroundUrl,
                }}
            />
            </InsetShadow>

        </MotiViews>
        </View>
    );
};

export default EventModalImg;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // height: 100,
        overflow: "hidden",
        borderRadius: 30,
        position: "absolute",
        // zIndex: -2,
        backgroundColor: 'black'
    },
    backgroundImg: {
        width: '100%',
        height: undefined,
        aspectRatio: 900 / 950, // Görüntünün orijinal en boy oranı

        borderRadius: 30,
    },
    backgroundImgContainer: {
        width: '100%',
        // height: 100,
        overflow: "hidden",
        borderRadius: 30,
        // position: "absolute",
        // zIndex: -2,
        backgroundColor: 'black'

    },
    shadowContainer: {
        // backgroundColor: 'blue',
        // position: "absolute",
        // zIndex: -1,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: COLORS.black,
    },
});
