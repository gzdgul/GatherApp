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
            likedEvents: [],
            purchasedEvents: [],

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
        setTimeout(() => {
            navigation.navigate('Tabs');
        },500)
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

export const addNewEvent = async (label, dateStart, dateEnd, day, price, tags, backgroundUrl, explanation) => {
    try {
        const eventId = new Date().getTime().toString(); // Şu anki zamanın milisaniye cinsinden değeri
        await setDoc(doc(db, "events", eventId), {
            eventId: eventId,
            label: label,
            dateStart: dateStart,
            dateEnd: dateEnd,
            day: day,
            price: price,
            tags: tags,
            backgroundUrl: backgroundUrl,
            explanation: explanation,
        });
        console.log('OK');
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode);
        console.log(errorMessage);
        // ...
    }
}

export const getEvents = async (setEvents) => {
    try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const events = [];
        querySnapshot.forEach((doc) => {
            events.push(doc.data());
        });
        setEvents(events);
    } catch (error) {
        console.error("Error getting events: ", error);
    }
};

export const setLikedEvents = async (event) => {
    if (auth.currentUser) {
        const user = auth.currentUser.uid
        const userRef = doc(db, 'users', user);
        await updateDoc(userRef, { likedEvents: event });
    }
}
export const setPurchasedEvents = async (event) => {
    if (auth.currentUser) {
        const user = auth.currentUser.uid
        const userRef = doc(db, 'users', user);
        await updateDoc(userRef, { purchasedEvents: event });
    }
}