import { Chart, Role, Status } from '../enums/all.enum';
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

  static async updateUserStatus(userId: string, status: Status) {
    return await ApiService.post("Admin/UpdateUserStatus", { userId: userId, status: status }, null);
  }

  static async updateUserRole(userId: string, role: Role) {
    return await ApiService.post("Admin/UpdateUserRole", { userId: userId, role: role }, null);
  }

} 