import axios from 'axios';
import { getSession } from 'next-auth/react';

export class MessagingService {

  static async getDialogs(){
    const session = await getSession();
    return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "User/GetDialogs", {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + session?.user.accessToken,     
      },
    }).then(response => response.data)
  }

  static async getMessages(id: string) {
    const session = await getSession();
    return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "User/GetMessages?id=" + id, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + session?.user.accessToken,     
      },
    }).then(response => response.data)
  }

  static async removeDialog(id: string) {
    const session = await getSession();
    return await axios.delete(process.env.NEXT_PUBLIC_STRAPI_API + "User/RemoveDialog?id=" + id, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + session?.user.accessToken,     
      },
    }).then(response => response.data)
  }

  static async sendMessage(formData: FormData){
    const session = await getSession();
    return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "User/SendMessage", formData, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + session?.user.accessToken,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
} 