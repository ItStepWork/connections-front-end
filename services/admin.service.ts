import { Chart, Role, Status } from '../enums/all.enum';
import { ApiService } from './api.service';

export class AdminService {

  static async getUsers() {
    return await ApiService.get("Admin/GetUsers", []);
  }

  static async getGroups() {
    return await ApiService.get("Admin/GetGroups", []);
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

  static async updateGroupStatus(groupId: string, status: Status) {
    return await ApiService.post("Admin/UpdateGroupStatus", { groupId: groupId, status: status }, null);
  }

  static async updateUserRole(userId: string, role: Role) {
    return await ApiService.post("Admin/UpdateUserRole", { userId: userId, role: role }, null);
  }

  static async updateUserBlockingTime(userId: string, blockingTime: string) {
    return await ApiService.post("Admin/UpdateUserBlockingTime", { userId: userId, blockingTime: blockingTime }, null);
  }
  static async updateGroupBlockingTime(groupId: string, blockingTime: string) {
    return await ApiService.post("Admin/UpdateGroupBlockingTime", { groupId: groupId, blockingTime: blockingTime }, null);
  }

} 