import React from 'react';
import InsetShadow from "react-native-inset-shadow";
import {Image, StyleSheet} from "react-native";
import {View as MotiViews} from "moti/build/components/view";
import {COLORS} from "../../config/constants";

const EventBoxLargeImg = ({selectedEvent, eventId, event}) => {
    return (
        <MotiViews
            transition={{ delay: 0, damping: 12, mass: 1 }}
            animate={{
                opacity: selectedEvent === eventId ? 0.8 : 0.6,
                height: selectedEvent === eventId ? 220 : 180,
                // blurRadius: selectedEvent === id ? 10 : 0,
            }}

            exitTransition={{
                type: 'timing',
                duration: 600,
            }}
            style={styles.test}
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
                    // blurRadius={2}
                    // loadingIndicatorSource={<LoadingSkeleton/>}
                    style={[styles.backgroundImg,
                    ]}
                    source={{
                        uri: event.backgroundUrl,
                    }}
                />
            </InsetShadow>
        </MotiViews>
    );
};

export default EventBoxLargeImg;

const styles = StyleSheet.create({

    backgroundImg: {
        width: '100%',
        minHeight: 220,
        aspectRatio: 872 / 486, // Görüntünün orijinal en boy oranı
        resizeMode: 'cover',
        // borderRadius: 20,
    },
    test: {
        width: '100%',
        height: 220,
        // backgroundColor: 'blue',
        borderRadius: 30,
        position: "absolute",
        zIndex: -2,
    },
    shadowContainer: {
        // backgroundColor: 'blue',
        // position: "absolute",
        zIndex: -1,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: COLORS.black,
    },

});
