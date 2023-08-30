'use strict'

import Firebase from '../src/services/firebase.service';
import { ref, onChildChanged } from 'firebase/database';

let i = 0;
let isSubscribeToMessages = false;
let userId = "";

function subscribe() {
  console.log(`Worker ${i++} ${userId}`);
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
