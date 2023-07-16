import React from 'react';
import {setLikedEvents} from "../firebase";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import useEvents from "../stores/useEvents";
import {COLORS} from "../config/constants";

const LikeButton = ({event}) => {
    const setLikedEventsLocal = useEvents((state) => state.setLikedEvents);
    const likedEventsLocal = useEvents((state) => state.liked);
    const handleEventLike = () => {
        if (likedEventsLocal.includes(event.eventId)) {
            const newArr = [...(likedEventsLocal.filter((x) => x !== event.eventId))]
            setLikedEventsLocal(newArr);
            setLikedEvents(newArr);
        }else {
            const newArr = [event.eventId, ...likedEventsLocal]
            setLikedEventsLocal(newArr);
            setLikedEvents(newArr);
        }

    }
    return (
        <TouchableOpacity style={styles.iconContainer} onPress={handleEventLike}>
            <Image
                source={require('../assets/likesIcon.png')}
                style={{
                    width: 20, // İkon genişliği
                    height: 20, // İkon yüksekliği
                    tintColor: likedEventsLocal.includes(event.eventId) ? 'red' : 'gray', // İkonun renk durumu
                }}
            />
        </TouchableOpacity>
    );
};

export default LikeButton;

const styles = StyleSheet.create({

    iconContainer: {
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    }
});
