import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDlVSa-LOn2ZFSK5RcPJUbbqd4m7pfvBaQ",
    authDomain: "bookexchange-cf6d9.firebaseapp.com",
    projectId: "bookexchange-cf6d9",
    storageBucket: "bookexchange-cf6d9.appspot.com",
    messagingSenderId: "425170655196",
    appId: "1:425170655196:web:65c8605418516d75f42119",
    measurementId: "G-0JENS4FP01"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };