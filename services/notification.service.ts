import axios from 'axios';
import { getSession } from 'next-auth/react';
import { CheckService } from './check.service';

export class NotificationService {

  static async getNotifications() {
    const session = await getSession();
    return await axios.get(process.env.NEXT_PUBLIC_API + "Notification/GetNotifications", {
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