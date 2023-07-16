import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, Keyboard, TextInput, StyleSheet} from "react-native";
import {COLORS} from "../config/constants";
import {logInAccount} from "../firebase";
import navigationContainer from "@react-navigation/native/src/NavigationContainer";
import useCurrentUser from "../stores/useCurrentUser";
import useEvents from "../stores/useEvents";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const currentUser = useCurrentUser((state) => state.currentUser);
    const setCurrentUser = useCurrentUser((state) => state.setCurrentUser);
    const setLikedEventsLocal = useEvents((state) => state.setLikedEvents);

    useEffect(() => {
        if (currentUser !== null) {
            console.log('currentUser?.likedEvents',currentUser?.likedEvents)
            setLikedEventsLocal(currentUser?.likedEvents)
        } else {
            console.log('currentUser',currentUser)
            console.log('currentUser?.likedEvents',currentUser?.likedEvents)
            setLikedEventsLocal([])
        }
    },[currentUser])

    const navigateSignUpScreen = () => {
        navigation.navigate('SignUp');
        setEmail('');
        setPassword('');
    }
    const handleLogin = async () => {
        await logInAccount(email,password, navigation, setCurrentUser);
    }

    const handleFastLogin = async () => {
        await logInAccount('ggozde@test.com','123456', navigation, setCurrentUser);
    }


    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.label}>LogIn</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={COLORS.ash}
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={COLORS.ash}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            disabled={!email.length > 0 && !password.length > 0}
                            onPress={handleLogin}
                            style={email.length > 0 && password.length > 0
                                ? styles.buttonActive
                                : styles.button}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleFastLogin}
                            style={styles.buttonActive}
                        >
                            <Text style={styles.buttonText}>FAST LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={navigateSignUpScreen}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Do you have an account? Sign up.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        // paddingTop: 50,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 26,
        color: COLORS.white,
        marginBottom: 30,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        backgroundColor: COLORS.gray,
        paddingHorizontal: 15,
        paddingVertical: 13,
        borderRadius: 10,
        marginBottom: 15,
        color: COLORS.white,
        fontSize: 16,
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 17,
        gap: 17,
    },
    button: {
        backgroundColor: COLORS.ash,
        width: '100%',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonActive: {
        backgroundColor: COLORS.purple,
        width: '100%',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonOutline: {
        // marginTop: 5,
        borderWidth: 2,
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: COLORS.white,
        fontWeight: '700',
        fontSize: 16,
    },
});