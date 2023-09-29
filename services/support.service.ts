import { ApiService } from './api.service';

export class SupportService {

  static async getMessages() {
    return await ApiService.get("Support/GetMessages", []);
  }

  static async sendMessage(formData: FormData) {
    return await ApiService.post("Support/SendMessage", null, formData);
  }

  static async sendComplaint(formData: FormData) {
    return await ApiService.post("Support/SendComplaint", null, formData);
  }

} 