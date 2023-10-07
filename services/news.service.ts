import axios from "axios";

export class NewsService {

  static async getNews() {
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=science&&api-key=1BftH87CsihlVLtptlrknZF5LoT50ZXy") 
}
}