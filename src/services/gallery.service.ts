import axios from 'axios';
import { getSession } from 'next-auth/react';

export class GalleryService {

    static async getPhotos() {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/GetPhotos", {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data);
    }

    static async addPhoto(formData: FormData) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/AddPhoto", formData, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static async setAvatar(url: string) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/SetAvatar",{ url: url }, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data);
    }

    static async setBackground(url: string) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/SetBackground",{ url: url }, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data);
    }

    static async removePhoto(id: string) {
        const session = await getSession();
        return await axios.delete(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/RemovePhoto?id=" + id, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data);
    }

    static async setLikePhoto(userId: string, photoId: string) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/SetLikePhoto", { userId: userId, photoId: photoId }, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data);
    }

    static async sendCommentPhoto(userId: string, photoId: string, text: string) {
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/SendCommentPhoto", { userId: userId, photoId: photoId, text: text },{
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data);
    }
} 