export const SendNotification = (name: string, text: string) => {
    navigator.serviceWorker.getRegistration().then((reg:any) => {
        console.log(reg)
        const options = {
            body: text,
            icon: '/public/icon-192x192.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 0,
            },
        }
        reg.showNotification(name, options);
    });
}