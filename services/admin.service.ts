import { ApiService } from './api.service';

export class AdminService {

  static async getUsers() {
    return await ApiService.get("Admin/GetUsers", []);
  }

  static async getAllActivity() {
    return await ApiService.get("Admin/GetAllActivity", []);
  }

  static async getPagesActivity() {
    return await ApiService.get("Admin/GetPagesActivity", []);
  }
  
  static async getUsersActivity() {
    return await ApiService.get("Admin/GetUsersActivity", []);
  }

} 