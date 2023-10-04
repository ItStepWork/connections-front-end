import { ApiService } from './api.service';

export class PostService {

    static async getPost(userId: string) {
        return await ApiService.get("Post/GetPost?userId=" + userId, null);
    }

    static async getPosts(userId: string) {
        return await ApiService.get("Post/GetPosts?userId=" + userId, []);
    }

    static async createPost(object: object) {
        return await ApiService.post("Post/CreatePost", object, null);
    }

    static async setLike(userId: string, postId: string) {
        return await ApiService.post("Post/SetLike", { userId: userId, postId: postId }, null);
    }

    static async sendComment(userId: string, postId: string, text: string) {
        return await ApiService.post("Post/SendComment", { userId: userId, postId: postId, text: text }, null);
    }

}