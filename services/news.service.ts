import axios from "axios";

export class NewsService {

  static async getNews(category: string) {
    return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${category}&&api-key=1BftH87CsihlVLtptlrknZF5LoT50ZXy`) 
  }

}