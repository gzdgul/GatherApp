import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from "react-native";
import {COLORS} from "../config/constants";

const PurchaseSuccess = ({navigation}) => {
    const navigateTicketScreen = () => {
        navigation.navigate('Home');
        setTimeout(() => {
            navigation.navigate('MyTickets');
        },1000)
    }

    return (
      <View style={styles.container}>
          <View style={styles.info}>
              <Image
                  source={require('../assets/tick.png')}
                  style={{
                      width: 100,
                      height: 100,
                      tintColor: COLORS.green,
                  }}
              />
              <View style={{marginTop: 20, justifyContent: 'center', alignItems: 'center',}}>
                  <Text style={[styles.label, {fontSize: 20,}]}>Purchase Successful</Text>
                  <Text style={styles.label}>Your ticket is ready</Text>
              </View>

          </View>
          <TouchableOpacity style={styles.button} onPress={navigateTicketScreen}>
              <Text style={styles.label}>Show Tickets</Text>
          </TouchableOpacity>
      </View>
    );
};

export default PurchaseSuccess;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        alignItems: 'center',
        justifyContent: "center",
    },
    info: {
        alignItems: 'center',
        justifyContent: "center",
        gap: 5,
    },
    label: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'RedHatBold'
    },
    button: {
        marginTop: 80,
        backgroundColor: COLORS.purple,
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 20,
    }

});