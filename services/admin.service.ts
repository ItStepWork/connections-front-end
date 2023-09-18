import axios from 'axios';
import { getSession } from 'next-auth/react';
import { CheckService } from './check.service';

export class AdminService {

  static async getUsers() {
    const session = await getSession();
    return await axios.get(process.env.NEXT_PUBLIC_API + "Admin/GetUsers", {
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

  static async getAllActivity() {
    const session = await getSession();
    return await axios.get(process.env.NEXT_PUBLIC_API + "Admin/GetAllActivity", {
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

  static async getDailyPagesActivityChart() {
    const session = await getSession();
    return await axios.get(process.env.NEXT_PUBLIC_API + "Admin/GetDailyPagesActivityChart", {
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
  
  static async getDailyActivityChart() {
    const session = await getSession();
    return await axios.get(process.env.NEXT_PUBLIC_API + "Admin/GetDailyActivityChart", {
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