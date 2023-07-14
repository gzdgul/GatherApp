import React from 'react';
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, Keyboard, TextInput, StyleSheet} from "react-native";
import {COLORS} from "../config/constants";
import { createAccount } from "../firebase";
import useCurrentUser from "../stores/useCurrentUser";
const SignUpScreen = ({navigation}) => {
    const [name, setName] = React.useState('')
    const [surname, setSurname] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const setCurrentUser = useCurrentUser((state) => state.setCurrentUser);

    const navigateLoginScreen = () => {
        navigation.navigate('LogIn');
        setName('');
        setSurname('');
        setEmail('');
        setPassword('');
    }
    const handleSignUp = async () => {
        await createAccount(name, surname,email, password, navigation, setCurrentUser);

    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.label}>Register</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Name"
                            placeholderTextColor={COLORS.ash}
                            value={name}
                            onChangeText={text => setName(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Surname"
                            placeholderTextColor={COLORS.ash}
                            value={surname}
                            onChangeText={text => setSurname(text)}
                            style={styles.input}
                        />
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
                            onPress={handleSignUp}
                            style={email.length > 0 && password.length > 0
                                ? styles.buttonActive
                                : styles.button}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={navigateLoginScreen}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Do you already have an account? Login.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default SignUpScreen;

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
        marginTop: 5,
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