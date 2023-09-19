import { ApiService } from './api.service';

export class MessagingService {

  static async getDialogs() {
    return await ApiService.get("Messaging/GetDialogs", []);
  }

  static async getMessages(id: string) {
    return await ApiService.get("Messaging/GetMessages?id=" + id, []);
  }

  static async removeDialog(id: string) {
    return await ApiService.delete("Messaging/RemoveDialog?id=" + id);
  }

  static async sendMessage(formData: FormData) {
    return await ApiService.post("Messaging/SendMessage", null, formData);
  }

  static async removeMessageFull(id: string) {
    return await ApiService.delete("Messaging/RemoveMessageFull?id=" + id);
  }

  static async removeMessage(id: string) {
    return await ApiService.delete("Messaging/RemoveMessage?id=" + id);
  }

} 