import axios from 'axios';
import { getSession } from 'next-auth/react';
import { CheckService } from './check.service';

export class MessagingService {

  static async getDialogs() {
    const session = await getSession();
    return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "Messaging/GetDialogs", {
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

  static async getMessages(id: string) {
    const session = await getSession();
    return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "Messaging/GetMessages?id=" + id, {
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

  static async removeDialog(id: string) {
    const session = await getSession();
    return await axios.delete(process.env.NEXT_PUBLIC_STRAPI_API + "Messaging/RemoveDialog?id=" + id, {
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

  static async sendMessage(formData: FormData) {
    const session = await getSession();
    return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Messaging/SendMessage", formData, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + session?.user.accessToken,
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => response.data)
      .catch((error) => {
        CheckService.signOut(session, error);
        return null;
      });
  }
} 