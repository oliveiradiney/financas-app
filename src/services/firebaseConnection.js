import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


let firebaseConfig = {
    apiKey: "AIzaSyBAiWkggXxF0O4HGnnqkAVJut4S0iQqoEU",
    authDomain: "financas-595fa.firebaseapp.com",
    databaseURL: "https://financas-595fa-default-rtdb.firebaseio.com",
    projectId: "financas-595fa",
    storageBucket: "financas-595fa.appspot.com",
    messagingSenderId: "62416506148",
    appId: "1:62416506148:web:7d17814c234cd2645df7b1"
};

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

export default firebase;