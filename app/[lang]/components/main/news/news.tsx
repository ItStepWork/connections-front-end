'use client'
import { useEffect, useState } from "react";
import { NewsService } from "../../../../../services/news.service";
import NewsCard from "./news-card/news-card";
import styles from "./news.module.scss";

export const News = (props: any) => {

  const [news, setNews] = useState<any>();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [elements, setElements] = useState<number>(2);

  const get = async () => {
    const data = await NewsService.getNews();
    setNews(data.data.response.docs)
    setIsLoad(true)
  }
  const loadMore = () => {
    setElements(elements + 2);
  }

  useEffect(() => {
    get()
  }, [])

  return (
    <>
      <div className={styles.container}>
        
        <h2>{props.local.main.news}</h2>
        {isLoad && 
        news.map((item: any, index: any) => {
          if (index < elements){
            return <NewsCard key={index} 
              header={item.headline.main} 
              url={item.multimedia[0].url} 
              text={item.lead_paragraph} 
              webUrl={item.web_url}
              local={props.local}
              category={item.section_name}
              source={item.source}/>         
          }
        })
        }
        <button className={styles.buttonLoadMore} onClick={() => loadMore()}>{props.local.button.uploadMore}</button>
      </div>
    </>
  )
}