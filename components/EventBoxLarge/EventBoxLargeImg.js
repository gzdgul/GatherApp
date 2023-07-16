import React from 'react';
import InsetShadow from "react-native-inset-shadow";
import {Image, StyleSheet, View} from "react-native";
import {View as MotiViews} from "moti/build/components/view";
import {COLORS} from "../../config/constants";
import LoadingSkeleton from "../LoadingSkeleton";

const EventBoxLargeImg = ({selectedEvent, eventId, event, setImageLoaded}) => {

    const handleLoad = () => {
        setImageLoaded(true);
    };
    return (
        <MotiViews
            transition={{ delay: 0, damping: 15, mass: 0.5 }}
            animate={{
                opacity: selectedEvent === eventId ? 0.9 : 0.8,
                height: selectedEvent === eventId ? 250 : 180,
                // blurRadius: selectedEvent === eventId ? 10 : 0,
                backgroundColor: 'black',
            }}

            exitTransition={{
                type: 'timing',
                duration: 300,
            }}
            style={styles.test}
        >

                <Image
                    blurRadius={20}
                    // onProgress={handleProgress}
                    onLoad={handleLoad}
                    // loadingIndicatorSource={<LoadingSkeleton/>}
                    style={[styles.backgroundImg,
                    ]}
                    source={{
                        uri: event.backgroundUrl,
                    }}
                />


        </MotiViews>
    );
};

export default EventBoxLargeImg;

const styles = StyleSheet.create({

    backgroundImg: {
        width: '100%',
        // minHeight: 220,
        aspectRatio: 872 / 586, // Görüntünün orijinal en boy oranı
        resizeMode: 'cover',
        borderRadius: 50,
    },
    test: {
        width: '100%',
        borderRadius: 50,
        position: "absolute",
        zIndex: -2,
        overflow: "hidden",


    },
    shadowContainer: {
        backgroundColor: 'black',
        // backgroundColor: 'blue',
        // position: "absolute",
        zIndex: -1,

        // borderWidth: 2,
        // borderColor: COLORS.black,
    },


});
