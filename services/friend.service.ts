import { ApiService } from './api.service';

export class FriendService {

    static async addFriend(id: string) {
        return await ApiService.post("Friend/AddFriend", { id: id }, null);
    }

    static async confirmFriend(id: string) {
        return await ApiService.post("Friend/ConfirmFriend", { id: id }, null);
    }

    static async removeFriend(id: string) {
        return await ApiService.delete("Friend/RemoveFriend?id=" + id);
    }

    static async getFriends(id: string) {
        return await ApiService.get("Friend/GetFriends?id=" + id, []);
    }

    static async getFriend(id: string) {
        return await ApiService.get("Friend/GetFriend?id=" + id, null);
    }

    static async getFriendsCount(id: string) {
        return await ApiService.get("Friend/GetFriendsCount?id=" + id, 0);
    }

    static async getConfirmedFriends(id: string) {
        return await ApiService.get("Friend/GetConfirmedFriends?id=" + id, []);
    }

    static async getUnconfirmedFriends(id: string) {
        return await ApiService.get("Friend/GetUnconfirmedFriends?id=" + id, []);
    }
    
    static async getWaitingFriends(id: string) {
        return await ApiService.get("Friend/GetWaitingFriends?id=" + id, []);
    }

    static async getOtherUsers(id: string) {
        return await ApiService.get("Friend/GetOtherUsers?id=" + id, []);
    }
    
} 