export const SendNotification = (body: string) => {
    navigator.serviceWorker.getRegistration().then((reg) => {
      console.log(reg)
      const options = {
        body: body,
        icon: '/icon/icon-512x512.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 0,
        },
      }
  
      reg?.showNotification("PWA", options)
    })
  }