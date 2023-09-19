import { ApiService } from './api.service';

export class UserService {

  static async setUserBgImage(formData: FormData) {
    return await ApiService.post("User/SaveBackground", null, formData);
  }

  static async setUserAvatarImage(formData: FormData) {
    return await ApiService.post("User/SaveAvatar", null, formData);
  }

  static async setUserProfile(formData: FormData) {
    return await ApiService.post("User/UpdateUser", null, formData);
  }

  static async getUser(id: string) {
    return await ApiService.get("User/GetUser?id=" + id, null);
  }

  static async getCurrentUser() {
    return await ApiService.get("User/GetCurrentUser", null);
  }

  static async getUsers() {
    return await ApiService.get("User/GetUsers", []);
  }

  static async setUserPassword(formData: FormData) {
    return await ApiService.post("User/UpdateUserPassword", null, formData);
  }

}