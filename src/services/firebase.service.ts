import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'

function Firebase() {
    const config = {
        apiKey: "AIzaSyDtiC2yncOKPGNFyfNzgEeRQNc7EFHGaGI",
        authDomain: "database-50f39.firebaseapp.com",
        databaseURL: "https://database-50f39-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "database-50f39",
        storageBucket: "database-50f39.appspot.com",
        messagingSenderId: "188116003866",
        appId: "1:188116003866:web:28c332eb745a7c4bddb5a3",
        measurementId: "G-8V6014J2T7"
    };
    const app = initializeApp(config);
    return getDatabase(app);
}

export default Firebase;