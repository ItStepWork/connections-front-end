'use strict'

import Firebase from '../src/services/firebase.service';
import { ref, onChildChanged } from 'firebase/database'

let i = 0;

function sayHello(name) {
  console.log(`${name} ${i++}`)
}

const load = async () => {
  try {
    onChildChanged(ref(Firebase(), `Messages`), (data) => {
      registration.showNotification("Valik", {
        body: "ky ky",
        icon: '/icons/android-chrome-192x192.png'
      })
      console.log(data);
    });
  }
  catch (error) {
    console.log("error:");
    console.log(error);
  }
}

setInterval(sayHello, 10000, "Worker")
load();
