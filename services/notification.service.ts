import { ApiService } from './api.service';

export class NotificationService {

  static async getNotifications() {
    return await ApiService.get("Notification/GetNotifications", []);
  }

  static async inviteToGroup(userId: string, groupId: string) {
    return await ApiService.post("Notification/InviteToGroup", { userId: userId, groupId: groupId }, null);
  }

}