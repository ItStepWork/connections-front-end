let isSubscribeToMessages = false;
let token = "";

function subscribe() {
  if(isSubscribeToMessages === false && token !== ""){
    isSubscribeToMessages = true;
    subscribeToMessages(token);
  }
}

const subscribeToMessages = async (accessToken) => {
  let socket = new WebSocket(`wss://connectionsapi-001-site1.btempurl.com/Subscription/SubscribeToMessages`, ["client", accessToken]);
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