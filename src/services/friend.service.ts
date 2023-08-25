import axios from 'axios';
import { getSession } from 'next-auth/react';
import { CheckService } from './check.service';

export class FriendService {

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
                CheckService.signOut(session, error);
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
                CheckService.signOut(session, error);
                return [];
            });
    }
} 