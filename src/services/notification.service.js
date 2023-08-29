export const SendNotification = (name, text) => {
    const options = {
        body: text,
        icon: '/public/icon-192x192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 0,
        },
    }
    self.registration.showNotification(name, options);
}