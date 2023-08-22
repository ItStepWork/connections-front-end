import { IUser } from '@/interfaces/user.interface';
import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

export class UserService {

  static checkLogin(session: any, response: any) {
    if (session !== null && response.status === 401) {
        signOut();
    }
}

  static async setUserBgImage(formData: FormData) {
    const session = await getSession();
    return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "User/SaveBackground", formData, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + session?.user.accessToken,
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => response.data)
      .catch((error) => {
        this.checkLogin(session, error.response);
        return null;
      });
  }

  static async setUserAvatarImage(formData: FormData) {
    const session = await getSession();
    return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "User/SaveAvatar", formData, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + session?.user.accessToken,
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => response.data)
      .catch((error) => {
        this.checkLogin(session, error.response);
        return null;
      });
  }

  static async getUser(id: string) {
    const session = await getSession();
    return await axios.get<IUser>(process.env.NEXT_PUBLIC_STRAPI_API + "User/GetUser?id=" + id, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + session?.user.accessToken,
      },
    }).then(response => response.data)
      .catch((error) => {
        this.checkLogin(session, error.response);
        return null;
      });
  }

  static async getCurrentUser() {
    const session = await getSession();
    return await axios.get<IUser>(process.env.NEXT_PUBLIC_STRAPI_API + "User/GetUser?id=" + session?.user.id, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + session?.user.accessToken,
      },
    }).then(response => response.data)
      .catch((error) => {
        this.checkLogin(session, error.response);
        return null;
      });
  }

  static async getUsers() {
    const session = await getSession();
    return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "User/GetUsers", {
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

  static async addFriend(id: string) {
    const session = await getSession();
    return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "User/AddFriend", { userId: id }, {
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
    return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "User/GetFriends", {
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