import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {arrayUnion, collection, doc, getDoc, getDocs, addDoc, orderBy, getFirestore, setDoc, updateDoc, onSnapshot, where} from "firebase/firestore";

import {Alert} from "react-native";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBHAk1ce-Fo0dbJQs01_eKF8DHI-41gAdc",
    authDomain: "gather-b496e.firebaseapp.com",
    projectId: "gather-b496e",
    storageBucket: "gather-b496e.appspot.com",
    messagingSenderId: "997632650499",
    appId: "1:997632650499:web:0ef9eefd1f675038270d36"
};

const app = initializeApp(firebaseConfig);
// console.log(app)
console.log('!!!!!!!!!!!!!!!!!!app!!!!!!!!!!!!!!!!!!!!!!!!!!!')
const auth = getAuth();
const db = getFirestore();

export const createAccount = async (name, surname, email, password, navigation, setCurrentUser) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            name: name,
            surname: surname,
            email: email,
            events: {
                likedEvents: [],
                purchasedEvents: [],
            },
        });
        console.log(user);
        await getUser(user.uid, setCurrentUser)
        navigation.navigate('Tabs');
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode);
        console.log(errorMessage);
        // ...
    }
};
export const logInAccount = async (email, password, navigation, setCurrentUser) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user);
        await getUser(user.uid, setCurrentUser)
        navigation.navigate('Tabs');
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode);
        console.log(errorMessage);
    }
};
export const getUser = async (userUID, setCurrentUser) => {
    const unsub = onSnapshot(doc(db, "users", userUID), (doc) => {
        console.log("Current data: ", doc.data());
        setCurrentUser(doc.data());
    });
}