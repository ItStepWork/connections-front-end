'use client'

import { useEffect, useState } from "react";
import { NewsCategory } from "../../../../../enums/all.enum";
import { NewsService } from "../../../../../services/news.service";
import NewsCard from "./news-card/news-card";
import styles from "./news.module.scss";

export const News = (props: any) => {

  const { local } = props;

  const [news, setNews] = useState<any>();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [elements, setElements] = useState<number>(2);
  const [category, setCategory] = useState<string>('Science');
  // Fetching data
  const get = async (category: string) => {
    const data = await NewsService.getNews(category);
    setNews(data.data.response.docs)
    setIsLoad(true)
  }
  // Pagination
  const loadMore = () => {
    setElements(elements + 2);
  }
  // Map enum keys
  const categories = (Object.keys(NewsCategory) as (keyof typeof NewsCategory)[]).map(
    (key) => {
      return NewsCategory[key];
    },
  );
  // update data
  useEffect(() => {
    get(category);
  }, [category])

  return (
    <>
      <div className={styles.container}>
        <h2>{local.main.news}</h2>
        <div className="">
          <h3>{local.news.categories}</h3>
          {
            categories.map((item: string) => (
              <button className={styles.category} onClick={() => setCategory(item)}>{item}</button>
            ))
          }
        </div>
        {isLoad && 
        news.map((item: any, index: any) => {
          if (index < elements){
            return <NewsCard key={index} 
              header={item.headline.main} 
              url={item.multimedia[0].url} 
              text={item.lead_paragraph} 
              webUrl={item.web_url}
              local={local}
              category={item.section_name}
              source={item.source}/>         
          }
        })
        }
        <button className={styles.buttonLoadMore} onClick={() => loadMore()}>{local.button.uploadMore}</button>
      </div>
    </>
  )
}