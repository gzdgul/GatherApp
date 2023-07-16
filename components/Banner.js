import React from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {COLORS} from "../config/constants";
import useCurrentUser from "../stores/useCurrentUser";
import {View as MotiViews} from "moti/build/components/view";

const Banner = ({scrolledUp}) => {
    const currentUser = useCurrentUser((state) => state.currentUser);
    const [text, setText] = React.useState('');


    const onChangeText = (e) => {
        setText(e)
    }

    return (
        <MotiViews
            transition={{ delay: 100, damping: 20, mass: 0.8 }}
            animate={{
                top: scrolledUp ? -70: 0,
                // scale: scrolledUp ? 0.5: 1,
                height: scrolledUp ? 0: 180,
                // opacity: scrolledUp ? 0: 1
                // position: scrolledUp ? 'absolute' : 'relative'

                // blurRadius: selectedEvent === id ? 10 : 0,
            }}

            exitTransition={{
                type: 'timing',
                duration: 300,
            }}
            style={styles.banner}
        >
            <View style={styles.label}>
                <View style={styles.userButton}>
                    <Image
                        source={require('../assets/userIcon.png')}
                        style={{
                            width: 24, // İkon genişliği
                            height: 24, // İkon yüksekliği
                            tintColor: COLORS.ash, // İkonun renk durumu
                        }}
                    />
                </View>
                <Text style={styles.bannerText}>Home</Text>
                <Text style={styles.bannerText}>{currentUser?.name}</Text>
                <View style={styles.settings}>
                    <Image
                        source={require('../assets/dotsIcon.png')}
                        style={{
                            width: 40, // İkon genişliği
                            height: 9, // İkon yüksekliği
                            tintColor: COLORS.purple, // İkonun renk durumu
                        }}
                    />
                </View>
            </View>
            <View style={styles.searchContainer}>
                <View  style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder={'Search event'}
                        placeholderTextColor={COLORS.stone}
                    />
                    <Image
                        source={require('../assets/searchIcon.png')}
                        style={{
                            width: 20, // İkon genişliği
                            height: 20, // İkon yüksekliği
                            tintColor: COLORS.stone, // İkonun renk durumu
                        }}
                    />
                </View>

                <TouchableOpacity style={styles.icon}>
                    <Image
                        source={require('../assets/ucgenIcon.png')}
                        style={{
                            width: 20, // İkon genişliği
                            height: 20, // İkon yüksekliği
                            tintColor: COLORS.white, // İkonun renk durumu
                        }}
                    />
                </TouchableOpacity>
            </View>
        </MotiViews>



    );
};

export default Banner;

const styles = StyleSheet.create({
    banner: {
        width: '100%',
        borderRadius: 30,
        backgroundColor: COLORS.gray,
        justifyContent: "flex-end",
        padding: 10,
        zIndex: 100,
    },
    label: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    userButton: {
        width: 55,
        height: 55,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    bannerText: {
        color: COLORS.ash,
        fontSize: 13,
        fontWeight: '600',
    },
    settings: {
        width: 55,
        height: 55,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    searchContainer: {
        width: '100%',
        height: 55,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        marginTop: 12,
    },
    inputContainer: {
        flex: 1,
        backgroundColor: COLORS.sBlack,
        paddingHorizontal: 25,
        // paddingVertical: 20,
        alignItems: 'center',
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    input: {
        color: COLORS.white,
        // backgroundColor: 'red',
        width: '90%',
        height: 55,
        // paddingVertical: 20,
    },
    icon: {
        width: 55,
        height: 55,
        backgroundColor: COLORS.purple,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },

});