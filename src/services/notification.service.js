export const SendNotification = async (name, text) => {
    const options = {
        body: text,
        icon: '/public/icon-192x192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 0,
        },
    }
    Notification.requestPermission(status=>{
        console.log("status:", status);
    })
    navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(name, options);
    });
    // const reg = await navigator.serviceWorker.getRegistration();
    //  reg.showNotification(name, options);
    // navigator.serviceWorker.getRegistration().then(reg=>{
    //     reg.showNotification(name, options);
    // });
}