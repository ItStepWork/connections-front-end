import axios from 'axios';
import { getSession } from 'next-auth/react';
import { CheckService } from './check.service';

export class GroupService {

    static async getGroups() {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "Group/GetGroups", {
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
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Group/AddGroup", formData, {
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
    static async updateAvatar(formData: FormData) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Group/UpdateAvatar", formData, {
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
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Group/UpdateGroup", formData, {
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
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Group/JoinGroup", { id: id }, {
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
        return await axios.delete(process.env.NEXT_PUBLIC_STRAPI_API + "Group/LeaveGroup?id=" + id, {
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
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Group/RemoveUserFromGroup",{ id: groupId,userId:userId }, {
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
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Group/AcceptUserToGroup",{ id: groupId,userId:userId }, {
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
        return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "Group/GetGroup?id=" + id, {
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
        return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "Group/GetUsersGroup?id=" + id, {
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
        return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "Group/GetMembersGroup?id=" + id, {
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
        return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "Group/GetRequestsToGroup?id=" + id, {
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








}