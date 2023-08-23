import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

export class FriendService {

    static checkLogin(session: any, response: any) {
        if (session !== null && response.status === 401) {
            signOut();
        }
    }

    static async addFriend(id: string) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Friend/AddFriend", { userId: id }, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                this.checkLogin(session, error.response);
                return null;
            });
    }

    static async getFriends() {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "Friend/GetFriends", {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                this.checkLogin(session, error.response);
                return [];
            });
    }
} 