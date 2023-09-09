import axios from 'axios';
import { getSession } from 'next-auth/react';
import { CheckService } from './check.service';

export class GroupService {

    static async getGroups(userId:string) {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_API + "Group/GetGroups?userId="+userId, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return [];
            });
    }

    static async addGroup(formData: FormData) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_API + "Group/AddGroup", formData, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return null;
            });
    }

    static async deleteGroup(id: string) {
        const session = await getSession();
        return await axios.delete(process.env.NEXT_PUBLIC_API + "Group/DeleteGroup?id=" + id, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return null;
            });
    }
    static async updateAvatar(formData: FormData) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_API + "Group/UpdateAvatar", formData, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return null;
            });
    }
    static async updateGroup(formData: FormData) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_API + "Group/UpdateGroup", formData, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return null;
            });
    }
    static async joinGroup(id: string) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_API + "Group/JoinGroup", { id: id }, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
                'Content-Type': 'application/json',
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return null;
            });
    }

    static async leaveGroup(id: string) {
        const session = await getSession();
        return await axios.delete(process.env.NEXT_PUBLIC_API + "Group/LeaveGroup?id=" + id, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return null;
            });
    }

    static async removeUserFromGroup(groupId: string,userId: string) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_API + "Group/RemoveUserFromGroup",{ id: groupId,userId:userId }, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
                'Content-Type': 'application/json',
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return null;
            });
    }

    static async acceptUserToGroup(groupId: string,userId: string) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_API + "Group/AcceptUserToGroup",{ id: groupId,userId:userId }, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
                'Content-Type': 'application/json',
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return null;
            });
    }

    static async getGroup(id: string) {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_API + "Group/GetGroup?id=" + id, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return null;
            });
    }

    static async getUsersGroup(id: string) {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_API + "Group/GetUsersGroup?id=" + id, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return [];
            });
    }
    static async getMembersGroup(id: string) {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_API + "Group/GetMembersGroup?id=" + id, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return [];
            });
    }
    static async getRequestsToGroup(id: string) {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_API + "Group/GetRequestsToGroup?id=" + id, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return [];
            });
    }
    static async getFriendsInGroup(id: string) {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_API + "Group/GetFriendsInGroup?id=" + id, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return [];
            });
    }
    static async getFriendsForInvitation(id: string) {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_API + "Group/GetFriendsForInvitation?id=" + id, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return [];
            });
    }
    static async addPhoto(formData: FormData) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_API + "Group/AddPhoto", formData, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return null;
            });
    }
    static async getPhotos(groupId: string) {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_API + "Group/GetPhotos?groupId=" + groupId, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return [];
            });
    }
    static async removePhoto( groupId: string,photoId:string) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_API + "Group/RemovePhoto",{ id:groupId,photoId: photoId }, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
                'Content-Type': 'application/json',
            },
        }).then(response => response.data)
            .catch((error) => {
                CheckService.signOut(session, error);
                return null;
            });
    }








}