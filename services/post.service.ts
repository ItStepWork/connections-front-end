import { ApiService } from './api.service';

export class PostService {

    static async getPosts(id: string) {
        return await ApiService.get("Post/GetPosts?id=" + id, []);
    }

    static async createPost(formData: FormData) {
        return await ApiService.post("Post/CreatePost", null, formData);
    }

    static async setLike(recipientId: string, id: string) {
        return await ApiService.post("Post/SetLike", { id: id, recipientId: recipientId }, null);
    }

    static async sendComment(recipientId: string, id: string, text: string) {
        return await ApiService.post("Post/SendComment", { id: id, recipientId: recipientId, text: text }, null);
    }

    static async removePost( userId: string, id: string) {
        return await ApiService.post("Post/RemovePost", { id: id, userId: userId }, null);
    }

}