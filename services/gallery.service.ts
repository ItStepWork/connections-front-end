import { ApiService } from './api.service';

export class GalleryService {

    static async getPhotos(userId: string) {
        return await ApiService.get("Gallery/GetPhotos?userId=" + userId, []);
    }

    static async getPhoto(userId: string, photoId: string) {
        return await ApiService.get(`Gallery/GetPhoto?userId=${userId}&photoId=${photoId}`, null);
    }

    static async getAlbumPhotos(userId: string, albumId: string) {
        return await ApiService.get(`Gallery/GetAlbumPhotos?userId=${userId}&albumId=${albumId}`, []);
    }

    static async addPhoto(formData: FormData) {
        return await ApiService.post("Gallery/AddPhoto", null, formData);
    }

    static async setAvatar(url: string) {
        return await ApiService.post("Gallery/SetAvatar", { url: url }, null);
    }

    static async setBackground(url: string) {
        return await ApiService.post("Gallery/SetBackground", { url: url }, null);
    }

    static async setAlbum(photoId: string, albumId: string) {
        return await ApiService.post("Gallery/SetAlbum", { photoId: photoId, albumId: albumId }, null);
    }

    static async removePhoto(id: string) {
        return await ApiService.delete("Gallery/RemovePhoto?id=" + id);
    }

    static async removeAlbum(id: string) {
        return await ApiService.delete("Gallery/RemoveAlbum?id=" + id);
    }

    static async removeAlbumAndPhotos(id: string) {
        return await ApiService.delete("Gallery/RemoveAlbumAndPhotos?id=" + id);
    }

    static async setLikePhoto(userId: string, photoId: string) {
        return await ApiService.post("Gallery/SetLikePhoto", { userId: userId, photoId: photoId }, null);
    }

    static async sendCommentPhoto(userId: string, photoId: string, text: string) {
        return await ApiService.post("Gallery/SendCommentPhoto", { userId: userId, photoId: photoId, text: text }, null);
    }

    static async getAlbums(userId: string) {
        return await ApiService.get("Gallery/GetAlbums?userId=" + userId, []);
    }

    static async addAlbum(name: string, files: any[]) {
        const formData = new FormData();
        formData.append("name", name);
        for (const iterator of files) {
            formData.append("files", iterator);
        }
        return await ApiService.post("Gallery/AddAlbum", null, formData);
    }
    
} 