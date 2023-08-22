import axios from 'axios';
import { getSession } from 'next-auth/react';
import { signOut } from "next-auth/react";

export class GalleryService {

    static checkLogin(session: any, response: any) {
        if (session !== null && response.status === 401) {
            signOut();
        }
    }

    static async getPhotos() {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/GetPhotos", {
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

    static async getPhoto(userId: string, photoId: string) {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + `Gallery/GetPhoto?userId=${userId}&photoId=${photoId}`, {
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

    static async getAlbumPhotos(userId: string, albumId: string) {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + `Gallery/GetAlbumPhotos?userId=${userId}&albumId=${albumId}`, {
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

    static async addPhoto(formData: FormData) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/AddPhoto", formData, {
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

    static async setAvatar(url: string) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/SetAvatar", { url: url }, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                this.checkLogin(session, error.response);
                return null;
            });
    }

    static async setBackground(url: string) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/SetBackground", { url: url }, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                this.checkLogin(session, error.response);
                return null;
            });
    }

    static async setAlbum(photoId: string, albumId: string) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/SetAlbum", { photoId: photoId, albumId: albumId }, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                this.checkLogin(session, error.response);
                return null;
            });
    }

    static async removePhoto(id: string) {
        const session = await getSession();
        return await axios.delete(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/RemovePhoto?id=" + id, {
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

    static async removeAlbum(id: string) {
        const session = await getSession();
        return await axios.delete(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/RemoveAlbum?id=" + id, {
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

    static async removeAlbumAndPhotos(id: string) {
        const session = await getSession();
        return await axios.delete(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/RemoveAlbumAndPhotos?id=" + id, {
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

    static async setLikePhoto(userId: string, photoId: string) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/SetLikePhoto", { userId: userId, photoId: photoId }, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                this.checkLogin(session, error.response);
                return null;
            });
    }

    static async sendCommentPhoto(userId: string, photoId: string, text: string) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/SendCommentPhoto", { userId: userId, photoId: photoId, text: text }, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                this.checkLogin(session, error.response);
                return null;
            });
    }

    static async getAlbums() {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/GetAlbums", {
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

    static async addAlbum(name: string, files: any[]) {
        const formData = new FormData();
        formData.append("name", name);
        for (const iterator of files) {
            formData.append("files", iterator);
        }
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/AddAlbum", formData, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch((error) => {
                this.checkLogin(session, error.response);
                return null;
            });
    }
} 