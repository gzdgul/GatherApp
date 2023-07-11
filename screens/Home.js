import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity} from "react-native";
import {COLORS} from "../config/constants";
import * as Font from "expo-font";
import EventBoxLarge from "../components/EventBoxLarge/EventBoxLarge";

const Home = () => {
    const [text, setText] = React.useState('');
    const events = [
        {
            label: 'Sanat Festivali',
            dateStart: '10.08.2023',
            dateEnd: '12.08.2023',
            day: '2',
            price: 'Free',
            tags: ['Resim', 'heykel', 'fotoğrafçılık', 'performans sanatları'],
            backgroundUrl: 'https://i.ibb.co/dgJJKpc/Screenshot-3.png',
            explanation: 'Sanatın farklı alanlarından eserleri bir araya getiren bu festivalde, ünlü ve yetenekli sanatçılar eserlerini sergileyecek ve performanslarını sergileyecektir. Katılımcılar, sanatın çeşitli formlarını keşfedebilir ve etkinlik süresince sanatla dolu bir deneyim yaşayabilirler.',
        },
        {
            label: 'Doğa Yürüyüşü ve Kamp',
            dateStart: '05.09.2023',
            dateEnd: '07.09.2023',
            day: '2',
            price: '79',
            tags: ['Doğa', 'yürüyüş', 'kamp', 'açık hava aktiviteleri'],
            backgroundUrl: 'https://i.ibb.co/C0K1Hkd/Screenshot-6.png',
            explanation: 'Bu etkinlik, doğa severlere yönelik bir macera sunuyor. Katılımcılar, rehberler eşliğinde doğal güzelliklerle dolu bir parkta doğa yürüyüşü yapacak, kamp ateşi etrafında vakit geçirecek ve açık hava aktivitelerinin keyfini çıkaracaklar.',
        },
        {
            label: 'Fotoğrafçılık Turu',
            dateStart: '05.01.2024',
            dateEnd: '08.01.2024',
            day: '3',
            price: '199',
            tags: ['Fotoğrafçılık', 'manzara', 'portre', 'sokak fotoğrafçılığı'],
            backgroundUrl: 'https://i.ibb.co/474fcTf/ghhgfh.png',
            explanation: 'Bu tur, fotoğrafçılığa ilgi duyanlara yöneliktir. Katılımcılar, deneyimli fotoğrafçılar eşliğinde şehrin ve doğanın en güzel noktalarını keşfedecek, farklı fotoğraf tekniklerini öğrenecek ve unutulmaz anları kamera ile yakalayacaklar.',
        },
        {
            label: 'Yoga ve Meditasyon Kampı',
            dateStart: '02.11.2023',
            dateEnd: '05.11.2023',
            day: '3',
            price: '149',
            tags: ['Yoga', 'meditasyon', 'rahatlama', 'iç huzur'],
            backgroundUrl: 'https://i.ibb.co/wyVCFMQ/Screenshot-15.png',
            explanation: 'Bu kamp, stresli günlük yaşamdan uzaklaşmak ve iç huzuru bulmak isteyenlere yöneliktir. Katılımcılar, deneyimli yoga eğitmenleri tarafından yönlendirilen yoga derslerine katılacak, meditasyon yapacak ve doğayla iç içe bir ortamda rahatlama fırsatı bulacaklar.',
        },
        {
            label: 'Elektronik Müzik Festivali',
            dateStart: '13.02.2024',
            dateEnd: '17.02.2024',
            day: '4',
            price: '249',
            tags: ['müzik', 'DJ performansları', 'dans', 'parti'],
            backgroundUrl: 'https://i.ibb.co/QYJ8TTW/Screenshot-17.png',
            explanation: 'Bu elektronik müzik festivali, dans müziğinin en iyi örneklerini sunuyor. Ünlü DJ\'lerin performansları, renkli sahne şovları ve dans partileriyle dolu olan etkinlik, katılımcılara unutulmaz bir müzik deneyimi yaşatacak. Elektronik müzik tutkunları için kaçırılmaması gereken bir etkinlik.',
        },
        {
            label: '',
            dateStart: '',
            dateEnd: '',
            day: '',
            price: '',
            tags: [''],
            backgroundUrl: 'https://i.ibb.co/W0zKRBR/doodle.png',
            explanation: 'Daha fazlası için keşfet',
        },
    ]


    const onChangeText = (e) => {
        setText(e)
    }
    return (
       <View style={styles.container}>
        <View style={styles.banner}>
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
        </View>
           <View style={styles.labelContainer}>
               <Text style={styles.labelText}>Upcoming Events</Text>
               <View style={styles.eventNumber}>
                   <Text style={styles.eventNumberText}>{events.length}</Text>
               </View>
           </View>
           <ScrollView style={{ width: '100%',}}>
               <View style={[styles.eventsContainer, { height: events.length * 80 + 330}]}>
                   {
                       events.map((event,index) => {
                           return  <EventBoxLarge
                               key={index}
                               id={index +1}
                               event={event}
                           />
                       })
                   }
               </View>
           </ScrollView>
       </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        alignItems: 'center',
        paddingTop: 50,
        // paddingHorizontal: 4,
        //justifyContent: 'center',
    },
    banner: {
        width: '100%',
        height: 180,
        borderRadius: 30,
        backgroundColor: COLORS.stone,
        justifyContent: "flex-end",
        padding: 10,
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
        paddingVertical: 20,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    input: {
        color: COLORS.white,
    },
    icon: {
        width: 55,
        height: 55,
        backgroundColor: COLORS.purple,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    labelContainer: {
      width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginVertical: 12,
    },
    labelText: {
      color: COLORS.white,
        fontSize: 28,
        //fontWeight: '700',
        fontFamily: 'RedHatBold'
    },
    eventNumber: {
        width: 45,
        height: 45,
        backgroundColor: COLORS.gray,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    eventNumberText: {
      fontSize: 22,
        color: COLORS.ash,
        fontFamily: 'RedHatBold',
    },
    eventsContainer: {
        position: "relative",
        width: '100%',
        flexDirection: 'column', // Dikey olarak üst üste sıralama
        marginTop: -70,
    }
});
