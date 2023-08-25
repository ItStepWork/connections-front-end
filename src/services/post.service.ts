import axios from 'axios';
import { getSession } from 'next-auth/react';

  export class PostService {

    async createPost(){
        const post: Post = {
          Text: model.Text,
          ImageUrl: model.ImageUrl,
          VideoUrl: model.VideoUrl
        };
  }
}