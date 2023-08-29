export const SendNotification = (name: string, text: string) => {
    Notification.requestPermission().then((perm)=>{
        if(perm == "granted"){
            new Notification(name, {
                body: text,
                icon: "/public/icon-192x192.png",
            });
        }
        else{
            console.log("Permission denied");
        }
    });
}