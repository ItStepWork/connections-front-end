import axios from 'axios';
import { getSession } from 'next-auth/react';
import { CheckService } from './check.service';

export class FriendService {

    static async addFriend(id: string) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_API + "Friend/AddFriend", { id: id }, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return null;
            });
    }

    static async confirmFriend(id: string) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_API + "Friend/ConfirmFriend", { id: id }, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return null;
            });
    }

    
    static async removeFriend(id: string) {
        const session = await getSession();
        return await axios.delete(process.env.NEXT_PUBLIC_API + "Friend/RemoveFriend?id=" + id, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return null;
            });
    }

    static async getFriends() {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_API + "Friend/GetFriends", {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return [];
            });
    }

    static async getConfirmedFriends(id: string) {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_API + "Friend/GetConfirmedFriends?id=" + id, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return [];
            });
    }

    static async getUnconfirmedFriends(id: string) {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_API + "Friend/GetUnconfirmedFriends?id=" + id, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return [];
            });
    }
    
    static async getWaitingFriends(id: string) {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_API + "Friend/GetWaitingFriends?id=" + id, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return [];
            });
    }

    static async getOtherUsers(id: string) {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_API + "Friend/GetOtherUsers?id=" + id, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return [];
            });
    }
} 