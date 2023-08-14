import { IUser } from '@/interfaces/user.interface';
import axios from 'axios';

export class UserService {

  static token: string = "";

  static async setUserBgImage(formData: FormData){
    return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "User/SaveBackground", formData, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + this.token,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async setUserAvatarImage(formData: FormData){
    return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "User/SaveAvatar", formData, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + this.token,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async getUser(id: string) {
    return await axios.get<IUser>(process.env.NEXT_PUBLIC_STRAPI_API + "User/GetUser?id=" + id, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + this.token,     
      },
    }).then(response => response.data)
  }
} 