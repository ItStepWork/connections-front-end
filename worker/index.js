'use strict'

import { ref, onChildChanged } from '@firebase/database';
import { initializeApp } from "@firebase/app";
import { getDatabase } from '@firebase/database'

let isSubscribeToMessages = false;
let userId = "";

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

function subscribe() {
  console.log(`Worker ${userId}`);
  if(isSubscribeToMessages === false && userId !== ""){
    isSubscribeToMessages = true;
    subscribeToMessages(userId);
  }
}

const subscribeToMessages = async (id) => {
  onChildChanged(ref(Firebase(), `Messages/${id}`), (data) => {
    let array = Object.entries(data.val());
    let message = array[array.length - 1][1];
    if (message.Id !== undefined && message.Status === 0 && message.SenderId != id) {
      registration.showNotification("Новое сообщение", {
        body: message.Text,
        icon: '/icons/android-chrome-192x192.png'
      })
    }
  });
}

const channelWorkerBroadcast = new BroadcastChannel('channelWorker');
channelWorkerBroadcast.onmessage = (event) => {
  userId = event.data.userId;
}

console.log("Worker run!");
setInterval(subscribe, 5000);
