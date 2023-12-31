import React, {useEffect} from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    Image,
    Alert
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {COLORS} from "../config/constants";
import {View as MotiViews} from "moti/build/components/view";
import Modal from "react-native-modal";
import EventModalImg from "./EventModal/EventModalImg";
import EventBoxLargeInfoPin from "./EventBoxLarge/EventBoxLargeInfoPin";
import useEvents from "../stores/useEvents";
import {setLikedEvents} from "../firebase";
import LikeButton from "./LikeButton";
import PaymentPage from "./PaymentPage";

const EventBoxInfo = ({ visible, onClose, event, page, navigation }) => {

    const [isScrolledUp, setIsScrolledUp] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const setLikedEventsLocal = useEvents((state) => state.setLikedEvents);
    const likedEventsLocal = useEvents((state) => state.liked);
    const [deleteAnimation, setDeleteAnimation] = React.useState(false);
    const [isPaymentModalVisible, setPaymentModalVisible] = React.useState(false);


    useEffect(() => {
        if (deleteAnimation) {
            onClose()
        }
    },[deleteAnimation])


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

    const onRefresh = React.useCallback(() => {
            setRefreshing(false);
            setIsScrolledUp(false);
    }, []);

    const toggleModal = () => {
        setPaymentModalVisible(!isPaymentModalVisible);
    };


    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent;
        const scrollPosition = contentOffset.y;
        // setContentOffset(scrollPosition);
        const screenHeight = layoutMeasurement.height;
        const ekran20 = screenHeight * 0.2;
        // console.log(contentOffset.y)
        if (scrollPosition > 15) {
            // console.log('%50 SCROLLANDI !!!!!!!!!!!!!!!!!!!!!!!!')
            setIsScrolledUp(true);
        }
        if (scrollPosition < -85) {
            // console.log('!!!!!!!! ASAGI SCROLLANDI !!!!!!!!!!!!!!!!!!!!!!!!')
            setIsScrolledUp(false);
        }


    };

    return (
        <Modal isVisible={visible}
               // onRequestClose={onClose}
               animationIn={"slideInUp"}
               // animationOut={"slideInDown"}
               animationInTiming={300}
               // hasBackdrop={false}
               // presentationStyle={"formSheet"}
            onBackdropPress={onClose}
                style={styles.modal}
        >
            <View style={styles.container}>
                <MotiViews
                    transition={{ delay: 0, damping: 50, mass: 0.8 }}
                    animate={{

                        height:  isScrolledUp ? 90: 270,
                        scale: isScrolledUp ? 0.9 : 1,
                        // position: isScrolledUp ? 'fixed' : 'relative',
                        // top: isScrolledUp ? 30 : 0,
                        // left: 0,
                    }}

                    exitTransition={{
                        type: 'timing',
                        duration: 300,
                    }}
                    style={styles.eventImgContainer}
                >
                  <EventModalImg isScrolledUp={isScrolledUp} event={event}/>

                    {/*<Text style={{position: 'absolute', top: 0, left: 50, fontSize: 20, color: 'white', fontFamily: 'RedHatBold'}}>{event.label}</Text>*/}
                    {/*<View style={styles.eventImgContainer}></View>*/}
                </MotiViews>
                <ScrollView
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    persistentScrollbar={true}
                    overScrollMode={'always'}
                    showsVerticalScrollIndicator={false}
                    // StickyHeaderComponent={}
                    refreshControl={
                    Platform.OS === 'android' && <RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressBackgroundColor={'black'} />
                    }
                    contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 15, paddingBottom: 50,}}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelText}>
                                {event.label}
                            </Text>
                           <LikeButton event={event} page={page} setDeleteAnimation={setDeleteAnimation}/>
                        </View>
                         <View style={styles.contentContainer}>
                        <EventBoxLargeInfoPin text={event.day + ' GÜN'}/>
                             <Text style={[styles.text, {marginTop: 0}]}>
                                 {event.dateStart + ' - ' + event.dateEnd}
                             </Text>
                        </View>

                        <Text style={styles.text}>Kalan Bilet: 8 / 400</Text>
                    <View style={styles.contentContainer}>
                        <Text style={[styles.text, {marginTop: 0}]}>Popüler</Text>
                        <Image
                            source={require('../assets/fireIcon.png')}
                            style={{
                                width: 17, // İkon genişliği
                                height: 24, // İkon yüksekliği
                                tintColor: 'orange', // İkonun renk durumu
                            }}
                        />
                    </View>
                        <Text style={styles.text}>
                            {'Etkinlik Ücreti:  € ' + event.price}
                        </Text>
                        <Text style={styles.text}>
                            {event.explanation}
                        </Text>
                         <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginVertical: 20,}}>
                        {
                            event.tags.map((tag, index) => {
                                return <EventBoxLargeInfoPin key={index} text={tag}/>
                            })
                        }
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={toggleModal}>
                            <Text style={styles.buttonText}>Bilet Al</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: COLORS.stone }]}
                            onPress={onClose}>
                            <Text style={styles.buttonText}>Geri</Text>
                        </TouchableOpacity>

                </ScrollView>

            </View>
            <PaymentPage visible={isPaymentModalVisible} onClose={toggleModal} event={event} navigation={navigation} />
        </Modal>
    );
};

export default EventBoxInfo;
const styles = StyleSheet.create({
    container: {
        height: '80%',
        backgroundColor: COLORS.gray,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        // paddingBottom: 20,
    },
    button: {
        alignItems: "center",
        justifyContent: 'center',
       paddingVertical: 10,
       paddingHorizontal: 10,
        borderRadius: 30,
        height: 40,
        backgroundColor: COLORS.purple,
        marginVertical: 8,
    },
    buttonText: {
      fontFamily: 'RedHatBold',
        fontSize: 14,
        color: COLORS.white,
    },
    eventImgContainer: {
        width: '100%',
        // height: 200,
        // backgroundColor: 'yellow',
        justifyContent: "flex-end",
        borderRadius: 30,
        marginBottom: 15,

    },
    modal: {
        margin: 0,
        borderRadius: 30,
        justifyContent: 'flex-end',
    },
    backgroundImg: {
        width: '100%',
        height: undefined,
        aspectRatio: 900 / 950, // Görüntünün orijinal en boy oranı

        position: "absolute",
        borderRadius: 30,
    },
    backgroundImgContainer: {
        width: '100%',
        // height: 100,
        overflow: "hidden",
        borderRadius: 30,
    },
    text: {
        marginTop: 20,
        color: 'white',
        fontSize: 16,
        fontFamily: 'RedHatRegular',
    },
    labelText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'RedHatBold',
    },
    contentContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        gap: 12,
    },
    labelContainer: {
        flexDirection: 'row',
        marginTop: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: "space-between",
        gap: 12,
    },
    iconContainer: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    }
});
