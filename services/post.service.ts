import axios from 'axios';
import { getSession } from 'next-auth/react';

  export class PostService {

   public async createPost(){
      const session = await getSession();
      return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + "Post/GetPost", {
          headers: {
              "Accept": "application/json",
              "Authorization": "Bearer " + session?.user.accessToken,
          },
      }).then(response => response.data);
  }
  async getPostById(postId: string) {
    const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + `Post/GetPost?postId=${postId}`, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data);
  }
 async addComment(senderId: string, userId: string, postId: string, text: string) {

    const session = await getSession();
    const requestData = {
      senderId: senderId,
      userId: userId,
      postId: postId,
      text: text
  };
    return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Post/AddComment", requestData, {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + session?.user.accessToken,
        },
    }).then(response => response.data);
    };




  async likePost(senderId: string, userId: string, postId: string){
    const session = await getSession();
    const requestData = {
      senderId: senderId,
      userId: userId,
      postId: postId,
  };
    return await axios.post(process.env.NEXT_PUBLIC_STRAPI_API + "Post/LikePost", requestData, {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + session?.user.accessToken,
        },
    }).then(response => response.data);
  }
}