import axios from 'axios';
import { getSession } from 'next-auth/react';
import { signOut } from "next-auth/react";

export class GroupService {

    static checkLogin(session: any, response: any) {
        if (session !== null && response.status === 401) {
            signOut();
        }
    }

    static async getGroups() {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "Group/GetGroups", {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                this.checkLogin(session, error.response);
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
                this.checkLogin(session, error.response);
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
                this.checkLogin(session, error.response);
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
                this.checkLogin(session, error.response);
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
                this.checkLogin(session, error.response);
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
                this.checkLogin(session, error.response);
                return [];
            });
    }








}