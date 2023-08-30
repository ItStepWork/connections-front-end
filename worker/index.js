'use strict'

import Firebase from '/src/services/firebase.service';
import { ref, onChildChanged } from 'firebase/database'

onChildChanged(ref(Firebase(), `Messages`), (data) => {
  registration.showNotification("Valik", {
    body: "ky ky",
    icon: '/icons/android-chrome-192x192.png'
  })
  console.log(data);
});