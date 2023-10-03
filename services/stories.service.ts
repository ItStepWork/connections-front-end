import { ApiService } from "./api.service";


export class StoriesServices{

  static async addStory(name: string, files: any[]) {
    const formData = new FormData();
    formData.append("name", name);
    for (const iterator of files) {
      formData.append("files", iterator);
    }
    return await ApiService.post("Story/AddStory", null, formData);
  }

  static async getStories(userId: string) {
    return await ApiService.get("Story/GetStories?userId=" + userId, []);
  }

  static async getStoryPhotos(userId: string, storyId: string) {
    return await ApiService.get(`Story/GetStoryPhotos?userId=${userId}&storyId=${storyId}`, []);
  }

  static async deleteStory(id: string) {
    return await ApiService.delete("Story/DeleteStory?id=" + id);
  }

  static async deleteStoryAndPhotos(id: string) {
    return await ApiService.delete("Story/DeleteStoryAndPhotos?id=" + id);
  }
}