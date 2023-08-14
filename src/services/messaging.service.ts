import axios from 'axios';
import { getSession } from 'next-auth/react';

export class MessagingService {

  static async GetDialogs(){
    const session = await getSession();
    return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "User/GetDialogs", {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + session?.user.accessToken,     
      },
    }).then(response => response.data)
  }
} 