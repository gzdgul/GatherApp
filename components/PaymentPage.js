import React from 'react';
import Modal from "react-native-modal";
import {
    Alert,
    Image,
    Platform,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {View as MotiViews} from "moti/build/components/view";
import EventBoxLargeInfoPin from "./EventBoxLarge/EventBoxLargeInfoPin";
import {COLORS} from "../config/constants";
import EventBoxLarge from "./EventBoxLarge/EventBoxLarge";
import EventModalImg from "./EventModal/EventModalImg";
import useEvents from "../stores/useEvents";
import {setLikedEvents, setPurchasedEvents} from "../firebase";


const PaymentPage = ({visible, onClose, event, navigation}) => {
    const setPurchasedEventsLocal = useEvents((state) => state.setPurchasedEvents);
    const purchasedEventsLocal = useEvents((state) => state.purchased);

    const handlePurchaseEvent = () => {
        const newArr = [event.eventId, ...purchasedEventsLocal]
        navigation.navigate('PurchaseSuccess');
        setPurchasedEventsLocal(newArr)
        setPurchasedEvents(newArr)
    }

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

                <View style={styles.img}>
                    <EventModalImg event={event} isScrolledUp={true}/>
                </View>
                {/*<Text style={styles.text}>Geri</Text>*/}

                <View style={styles.innerContainer}>
                    <Text style={styles.text}>Ödeme Yöntemi</Text>
                    <View style={[styles.test, {justifyContent: 'space-between'}]}>
                        <View style={styles.paymentMethod}>
                            <Text style={[styles.text, {fontSize: 17, color: 'white'}]}>MasterCard</Text>
                            <Text style={[styles.text, {fontSize: 17, color: 'white'}]}>.... 3207</Text>
                        </View>
                        <View style={styles.paymentImg}>
                            <Image
                                source={require('../assets/mastercard.png')}
                                style={{
                                    width: '100%',
                                    height: undefined,
                                    aspectRatio: 179 / 122, // Görüntünün orijinal en boy oranı
                                    tintColor: 'white', // İkonun renk durumu
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.text}>Miktar</Text>
                    <View style={styles.test}>
                        <Text style={styles.textLarge}>{ event.price === 'Free' ? event.price : event.price + '.00 €'}</Text>
                    </View>
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.text}>İndirim Kodu</Text>
                    <View style={styles.test}>
                        <View style={{width: 180, height: 40, borderWidth:1, borderColor: COLORS.stone, borderRadius: 30,}}>

                        </View>

                    </View>
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.text}>Toplam Miktar</Text>
                    <View style={styles.test}>
                        <Text style={[styles.textLarge, {fontSize: 24}]}>{ event.price === 'Free' ? event.price : event.price + '.00 €'}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handlePurchaseEvent}>
                        <Text style={[styles.text, {color: 'black', fontFamily: 'RedHatBold'}]}>Ödemeyi Tamamla</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: COLORS.black}]} onPress={onClose}>
                        <Text style={[styles.text, { fontFamily: 'RedHatBold', fontSize: 14}]}>İptal Et / Geri Dön</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default PaymentPage;

const styles = StyleSheet.create({
    container: {
        height: '95%',
        backgroundColor: COLORS.black,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        // paddingBottom: 20,
    },
    modal: {
        margin: 0,
        borderRadius: 30,
        justifyContent: 'flex-end',
    },
    innerContainer: {
        borderBottomWidth: 1,
        borderColor: COLORS.stone,
        padding: 10,
    },
    test: {
        // height: 70,
        // backgroundColor: 'blue',
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        justifyContent: 'flex-end',

    },
    text: {
        color: COLORS.ash,
        fontSize: 15,
        fontFamily: 'RedHatRegular'
    },
    textLarge: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'RedHatBold'
    },
    img: {
        height: 180,
    },
    paymentImg: {
        width: 70,
        height: 50,
        // backgroundColor: COLORS.ash,
    },
    buttonContainer: {
      marginVertical: 20,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 20,
      backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 8,
    },

});
