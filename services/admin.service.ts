import { ApiService } from './api.service';

export class AdminService {

  static async getUsers() {
    return await ApiService.get("Admin/GetUsers", []);
  }

  static async getAllActivity() {
    return await ApiService.get("Admin/GetAllActivity", []);
  }

  static async getDailyPagesActivityChart() {
    return await ApiService.get("Admin/GetDailyPagesActivityChart", []);
  }
  
  static async getDailyActivityChart() {
    return await ApiService.get("Admin/GetDailyActivityChart", []);
  }

} 