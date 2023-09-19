import { ApiService } from './api.service';

export class GroupService {

    static async getGroups(userId: string) {
        return await ApiService.get("Group/GetGroups?userId=" + userId, []);
    }

    static async addGroup(formData: FormData) {
        return await ApiService.post("Group/AddGroup", null, formData);
    }

    static async deleteGroup(id: string) {
        return await ApiService.delete("Group/DeleteGroup?id=" + id);
    }

    static async updateAvatar(formData: FormData) {
        return await ApiService.post("Group/UpdateAvatar", null, formData);
    }

    static async updateGroup(formData: FormData) {
        return await ApiService.post("Group/UpdateGroup", null, formData);
    }

    static async joinGroup(id: string) {
        return await ApiService.post("Group/JoinGroup", { id: id }, null);
    }

    static async leaveGroup(id: string) {
        return await ApiService.delete("Group/LeaveGroup?id=" + id);
    }

    static async removeUserFromGroup(groupId: string, userId: string) {
        return await ApiService.post("Group/RemoveUserFromGroup", { id: groupId, userId: userId }, null);
    }

    static async acceptUserToGroup(groupId: string, userId: string) {
        return await ApiService.post("Group/AcceptUserToGroup", { id: groupId, userId: userId }, null);
    }

    static async getGroup(id: string) {
        return await ApiService.get("Group/GetGroup?id=" + id, null);
    }

    static async getUsersGroup(id: string) {
        return await ApiService.get("Group/GetUsersGroup?id=" + id, []);
    }

    static async getMembersGroup(id: string) {
        return await ApiService.get("Group/GetMembersGroup?id=" + id, []);
    }

    static async getRequestsToGroup(id: string) {
        return await ApiService.get("Group/GetRequestsToGroup?id=" + id, []);
    }

    static async getFriendsInGroup(id: string) {
        return await ApiService.get("Group/GetFriendsInGroup?id=" + id, []);
    }

    static async getFriendsForInvitation(id: string) {
        return await ApiService.get("Group/GetFriendsForInvitation?id=" + id, []);
    }

    static async addPhoto(formData: FormData) {
        return await ApiService.post("Group/AddPhoto", null, formData);
    }

    static async getPhotos(groupId: string) {
        return await ApiService.get("Group/GetPhotos?groupId=" + groupId, []);
    }

    static async removePhoto(groupId: string, photoId: string) {
        return await ApiService.post("Group/RemovePhoto", { id: groupId, photoId: photoId }, null);
    }

}