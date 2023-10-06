export interface ISubscribe {
    path: string;
    func: Function;
}

export interface IUnsubscribe {
    socket: WebSocket;
    timer: NodeJS.Timer;
}

export class SubscriptionService {

    static subscribeToChannel(token: string, path: string, func: Function) {
        let socket = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + path, ["client", token]);
        socket.addEventListener('message', (event) => {
            func();
        });
        let interval = setInterval(() => {
            if (socket.OPEN) socket.send("ping");
            else clearInterval(interval);
        }, 30000);
        return () => {
            setTimeout(() => { if (socket.OPEN) socket.close(); }, 1000)
            clearInterval(interval);
        };
    }

    static subscribeToTwoChannels(token: string, pathOne: string, funcOne: Function, pathTwo: string, funcTwo: Function) {
        let socketOne = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + pathOne, ["client", token]);
        socketOne.addEventListener('message', (event) => {
            funcOne();
        });
        let socketTwo = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + pathTwo, ["client", token]);
        socketTwo.addEventListener('message', (event) => {
            funcTwo();
        });
        let intervalOne = setInterval(() => {
            if (socketOne.OPEN) socketOne.send("ping");
            else clearInterval(intervalOne);
        }, 30000);
        let intervalTwo = setInterval(() => {
            if (socketTwo.OPEN) socketTwo.send("ping");
            else clearInterval(intervalTwo);
        }, 30000);
        return () => {
            setTimeout(() => {
                if (socketOne.OPEN) socketOne.close();
                if (socketTwo.OPEN) socketTwo.close();
            }, 1000)
            clearInterval(intervalOne);
            clearInterval(intervalTwo);
        };
    }

    static subscribeToChannels(token: string, subscriptions: ISubscribe[]) {
        let unsubscribes: IUnsubscribe[] = [];
        subscriptions.forEach(element => {
            let socket = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + element.path, ["client", token]);
            socket.addEventListener('message', (event) => {
                element.func();
            });
            let timer = setInterval(() => {
                if (socket.OPEN) socket.send("ping");
                else clearInterval(timer);
            }, 30000);
            unsubscribes.push({socket: socket, timer: timer});
        });
        return ()=>{
            unsubscribes.forEach(element => {
                setTimeout(() => {
                    if (element.socket.OPEN) element.socket.close();
                }, 1000);
                clearInterval(element.timer);
            });
        }
    }

}