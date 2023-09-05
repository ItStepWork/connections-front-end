let isSubscribeToMessages = false;
let token = "";

function subscribe() {
  if(isSubscribeToMessages === false && token !== ""){
    isSubscribeToMessages = true;
    subscribeToMessages(token);
    subscribeToFriendRequest(token);
  }
}

const subscribeToMessages = async (accessToken) => {
  let socket = new WebSocket(`${process.env.NEXT_PUBLIC_SUBSCRIPTION_API}Subscription/SubscribeToMessages`, ["client", accessToken]);
  socket.addEventListener('message', (event) => {
    let response = JSON.parse(event.data);
    registration.showNotification(response.Title, {
      body: response.Text,
      icon: response.AvatarUrl,
    });
  });
  setInterval(()=>{
    socket.send("ping");
  }, 30000);
}

const subscribeToFriendRequest = async (accessToken) => {
  let socket = new WebSocket(`${process.env.NEXT_PUBLIC_SUBSCRIPTION_API}Subscription/SubscribeToFriendRequest`, ["client", accessToken]);
  socket.addEventListener('message', (event) => {
    let response = JSON.parse(event.data);
    registration.showNotification(response.Title, {
      body: response.Text,
      icon: response.AvatarUrl,
    });
  });
  setInterval(()=>{
    socket.send("ping");
  }, 30000);
}

const channelWorkerBroadcast = new BroadcastChannel('channelWorker');
channelWorkerBroadcast.onmessage = (event) => {
  token = event.data.token;
}

console.log("Worker run!");
setInterval(subscribe, 5000);