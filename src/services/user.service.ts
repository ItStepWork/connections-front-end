import { IUser } from '@/interfaces/user.interface';
import axios from 'axios';

class UserService {

  private _saveBackground: string = "User/SaveBackground";
  private _saveAvatar: string = "User/SaveAvatar";
  private _getUser: string = "User/GetUser?id=";

  async setUserBgImage(id: string, formData: FormData){
    return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + this._saveBackground, formData, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + id,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async setUserAvatarImage(id: string, formData: FormData){
    return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + this._saveAvatar, formData, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + id,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async getUser(id: string, token:string) {
    return await axios.get<IUser>(process.env.NEXT_PUBLIC_STRAPI_API + this._getUser + id, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + token,     
      },
    }).then(response => response.data)

  }
} 
export default new UserService();