import axios from 'axios';
import { getSession } from 'next-auth/react';
import { CheckService } from './check.service';

export class NotificationService {

  static async getNotifications() {
    const session = await getSession();
    return await axios.get(process.env.NEXT_PUBLIC_API + "Notifications/GetNotifications", {
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

  static async inviteToGroup(userId: string, groupId: string) {
    const session = await getSession();
    return await axios.post(process.env.NEXT_PUBLIC_API + "Notifications/InviteToGroup", { userId: userId, groupId: groupId }, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + session?.user.accessToken,
        'Content-Type': 'application/json',
      },
    }).then(response => response.data)
      .catch((error) => {
        CheckService.signOut(session, error);
        return null;
      });
  }

} 