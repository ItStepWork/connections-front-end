import { Chart } from '../enums/all.enum';
import { ApiService } from './api.service';

export class AdminService {

  static async getUsers() {
    return await ApiService.get("Admin/GetUsers", []);
  }

  static async getAllActivity() {
    return await ApiService.get("Admin/GetAllActivity", []);
  }

  static async getPagesActivity(chart: Chart) {
    return await ApiService.get("Admin/GetPagesActivity?chart=" + chart, []);
  }
  
  static async getUsersActivity(chart: Chart) {
    return await ApiService.get("Admin/GetUsersActivity?chart=" + chart, []);
  }

} 